import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ButonSubmit from "../../../../componente/Butoane/ButonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSDPersoana } from "./Interfete";
import { useEffect, useState } from "react";
import InputSDPersoana from "./Componente/InputSDPersoana";
import { verificareFormPersoana } from "../../../InregistrareUtilizator/InregistrarePersoana/Validari/Validari";
import { verificareForm } from "../../../InregistrareUtilizator/Validari/Validari";
import Localitati from "../../../../componente/ComboBox/Localitati";
import Notificare from "../../../../componente/Erori/Notificare/Notificare";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete";
import CheckIcon from "@mui/icons-material/Check";
import { Localitate, Persoana_fizica, Utilizator } from "@prisma/client";
import {
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
} from "../../../../componente/Erori/RutaProtejata";
import React from "react";

interface CardSchimbareDateContPersoana {
  schimbareDateCont: boolean;
  inchideSchimbareDateCont: () => void;
  renunta: () => void;
}

const SchimbareDatePersoana = ({
  schimbareDateCont,
  inchideSchimbareDateCont,
  renunta,
}: CardSchimbareDateContPersoana) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSDPersoana>();

  const { utilizatorCurent, setUtilizatorCurent } = React.useContext(
    ContextUtilizatorCurent
  );
  const { persoanaCurenta, setPersoanaCurenta } = React.useContext(
    ContextPersoanaCurenta
  );
  const [localitate, setLocalitate] = React.useState<Localitate | null>(null);

  const [notificare, setNotificare] = useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const [succes, setSucces] = useState<boolean>(false);

  useEffect(() => {
    if (persoanaCurenta && localitate) {
      setValue("localitate", localitate.denumire_localitate);
    }
  }, [persoanaCurenta, localitate, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (!utilizatorCurent) return;

      const [localitateResp, utilizatorResp, persoanaResp] = await Promise.all([
        fetch(
          `${process.env.API_GET_LOCALITATI}/${utilizatorCurent.localitate}`
        ),
        fetch("http://localhost:3000/api/utilizatori/curent"),
        fetch(
          `${process.env.API_GET_PERSOANA_CURENTA}/${utilizatorCurent.id_utilizator}`
        ),
      ]);

      if (!localitateResp.ok || !utilizatorResp.ok || !persoanaResp.ok) {
        setNotificare({
          open: true,
          mesaj: "Failed to fetch data",
          tip: "eroare",
        });
        return;
      }

      const localitateData = await localitateResp.json();
      const utilizatorData = await utilizatorResp.json();
      const persoanaData = await persoanaResp.json();

      setLocalitate(localitateData);
      setUtilizatorCurent(utilizatorData);
      setPersoanaCurenta(persoanaData);
    };

    fetchData();
  }, [succes]);

  const onSubmit: SubmitHandler<FormSDPersoana> = async (
    data: FormSDPersoana
  ) => {
    try {
      const raspunsActualizare = await fetch(
        process.env.API_BASE + "/api/utilizatori/persoana/edit",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspunsActualizare.ok) {
        const eroare = await raspunsActualizare.json();
        setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
      }
      if (raspunsActualizare.status === 200) {
        setSucces((v) => !v);
        setTimeout(() => {
          renunta();
          setSucces((v) => !v);
        }, 1000);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Datele nu au putut fi trimise către server",
        tip: "eroare",
      });
    }
  };

  return (
    localitate &&
    persoanaCurenta &&
    utilizatorCurent && (
      <Dialog open={schimbareDateCont} onClose={inchideSchimbareDateCont}>
        <DialogContent sx={{ padding: 0 }}>
          <DialogTitle sx={{ padding: 0 }}>
            <div className="flex gap-2 justify-center items-center p-2 mt-4">
              <ManageAccountsIcon color="success" />
              <span className="font-bold uppercase text-green-600">
                Schimbă datele contului
              </span>
            </div>
          </DialogTitle>
          <form
            className="w-full flex flex-col gap-3 p-4"
            onSubmit={handleSubmit(onSubmit)}>
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Nume de utilizator"
              name="nume_utilizator"
              validari={verificareForm.nume_utilizator}
              valoareDefault={utilizatorCurent.nume_utilizator}
            />
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Nume"
              name="nume"
              validari={verificareFormPersoana.nume}
              valoareDefault={persoanaCurenta.nume}
            />
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Prenume"
              name="prenume"
              validari={verificareFormPersoana.prenume}
              valoareDefault={persoanaCurenta.prenume}
            />
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Telefon"
              name="telefon"
              validari={verificareForm.telefon}
              valoareDefault={utilizatorCurent.telefon}
            />
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Email"
              name="email"
              validari={verificareForm.email}
              valoareDefault={utilizatorCurent.email}
            />
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputSDPersoana
                register={register}
                errors={errors}
                label="Strada"
                name="strada"
                validari={verificareForm.strada}
                valoareDefault={utilizatorCurent.strada}
              />
              <InputSDPersoana
                register={register}
                errors={errors}
                label="Număr"
                name="numar"
                validari={verificareForm.numar}
                valoareDefault={utilizatorCurent.numar}
              />
            </section>
            <Localitati
              register={register}
              errors={errors}
              name="localitate"
              validari={verificareForm.localitate}
              valoareInitiala={localitate.denumire_localitate}
            />
            {succes && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Datele tale au fost modificată cu succes!
              </Alert>
            )}
            <section className="flex gap-2">
              <ButonSubmit tailwind="w-1/2" text="Schimbă datele" />
              <Button
                className="w-1/2"
                color="error"
                variant="outlined"
                onClick={renunta}>
                Renunțare
              </Button>
            </section>
          </form>
        </DialogContent>
        <Notificare notificare={notificare} setNotificare={setNotificare} />
      </Dialog>
    )
  );
};

export default SchimbareDatePersoana;
