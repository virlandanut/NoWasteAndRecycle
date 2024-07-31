import React from "react";
import { useForm } from "react-hook-form";
import { FormSelectieReciclare } from "./Interfete";
import InputSelectie from "./Componente/InputSelectie";
import TipContainerSelectie from "./Componente/TipContainer";
import { Paper } from "@mui/material";
import PreferintaInterval from "../Componente/PreferintaInterval";
import ButonSubmit from "../../../../../../../componente/Butoane/ButonSubmit";
import { verificareFormSelectieReciclare } from "./Componente/Validari";
import { InterfataNotificare } from "../../../../../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../../../../../componente/Erori/Notificare/Notificare";
import { setareValoriNeselectate } from "./Functii";
import { IContainerOptim, ICoordonate } from "../../../../../Interfete";
import { ContextUtilizatorCurent } from "../../../../../../../componente/Erori/RutaProtejata";
import Header from "../../../../../../../componente/Titluri/Header";
import { Utilizator } from "@prisma/client";

interface FormSelectieContainerProps {
  setContainer: (container: IContainerOptim | null) => void;
  tipContainer: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
  utilizatorCurent: Utilizator | null;
}

const FormSelectie = (props: FormSelectieContainerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormSelectieReciclare>();

  const [coordonate, setCoordonate] = React.useState<ICoordonate | null>(null);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  React.useEffect(() => {
    reset();
    setValue("tipContainer", props.tipContainer);
  }, [props.tipContainer, setValue]);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pozitie) => {
        const { latitude, longitude } = pozitie.coords;
        setCoordonate({ latitudine: latitude, longitudine: longitude });
      });
    } else {
      setNotificare({
        open: true,
        mesaj: "Nu există suport pentru geolocație în acest browser",
        tip: "eroare",
      });
    }
  }, []);

  const onSubmit = async (data: FormSelectieReciclare) => {
    const date = setareValoriNeselectate({ ...data, coordonate }, "");

    try {
      const api: string | undefined = process.env.API_CONTAINER;
      if (!api) {
        setNotificare({
          open: true,
          mesaj: "API-ul de selecție a containerelor este eronat",
          tip: "eroare",
        });
        return;
      }

      const raspuns = await fetch(api + "/filtrare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(date),
      });
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
        props.setContainer(null);
        return;
      }
      const datePrimite = await raspuns.json();
      console.log(datePrimite);
      props.setContainer(datePrimite);
    } catch (eroare) {
      console.log(eroare);
      setNotificare({
        open: true,
        mesaj: "Datele nu au putut fi trimise către server",
        tip: "eroare",
      });
    }
  };

  return (
    props.utilizatorCurent && (
      <Paper className="flex flex-col gap-5 p-4" elevation={0}>
        <Header mesaj={`Preferințe container ${props.tipContainer}`} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center gap-4"
          action="">
          {props.tipContainer === "RECICLARE" && (
            <TipContainerSelectie
              register={register}
              errors={errors}
              name="tip"
            />
          )}
          {props.utilizatorCurent.rol === "FIRMA" && (
            <React.Fragment>
              <InputSelectie
                register={register}
                errors={errors}
                label="Capacitate minimă (opțional)"
                name="capacitate"
                validare={verificareFormSelectieReciclare.capacitate}
              />
              <PreferintaInterval
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </React.Fragment>
          )}
          <ButonSubmit text="Trimite" />
        </form>
        <Notificare notificare={notificare} setNotificare={setNotificare} />
      </Paper>
    )
  );
};

export default FormSelectie;
