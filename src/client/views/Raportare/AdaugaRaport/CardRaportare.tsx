import { Alert, Button, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import InputRaportare from "./Componente/InputRaportare.js";
import Mesaj from "./Componente/Mesaj.js";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit.js";
import Dialog from "@mui/material/Dialog";
import DescriereUtilizatorRaportare from "./Componente/DescriereUtilizatorRaportare.js";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import { verificareFormRaport } from "./Validari/Validari.js";
import { CardRaportareProps, FormTichet } from "./Interfete.js";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { Utilizator } from "@prisma/client";
import React from "react";
import { ContextUtilizatorCurent } from "../../../componente/Erori/RutaProtejata.js";

interface datePrimite {
  mesaj: string;
  id: number;
}

const CardRaportare = ({
  renunta,
  raportare,
  inchideRaport,
}: CardRaportareProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormTichet>();

  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [succes, setSucces] = React.useState<boolean>(false);
  const [butonDezactivat, setButonDezactivat] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormTichet) => {
    if (!utilizatorCurent) {
      navigate("/login", { replace: true });
      return;
    }
    try {
      const idUtilizator = utilizatorCurent.id_utilizator;
      const raspuns = await fetch(process.env.API_BASE + "/api/raport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUtilizator, ...data }),
      });
      if (raspuns.status === 200) {
        const data: datePrimite = await raspuns.json();
        setSucces(true);
        setButonDezactivat(true);
        setTimeout(() => {
          inchideRaport();
          reset();
          navigate(`/raport/${data.id}`);
        }, 1000);
      }
    } catch (eroare) {
      console.log(eroare);
    }
  };
  return (
    <Dialog open={raportare} onClose={inchideRaport}>
      <DialogContent
        sx={{ padding: 0 }}
        className="flex flex-col mt-4 w-[500px]">
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2">
            <NewReleasesRoundedIcon color="error" />
            <span className="font-bold uppercase text-red-600">
              Trimite un tichet
            </span>
          </div>
        </DialogTitle>
        <DescriereUtilizatorRaportare />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4">
          <InputRaportare
            register={register}
            errors={errors}
            name="titlu"
            validari={verificareFormRaport.titlu}
            label="Subiect"
          />
          <Mesaj
            register={register}
            errors={errors}
            name="mesaj"
            validari={verificareFormRaport.mesaj}
            label="Descriere"
          />
          {succes && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Tichetul a fost trimis cu succes!
            </Alert>
          )}
          <div className="w-full flex gap-4">
            <ButonSubmit
              tailwind={"w-1/2"}
              text="Trimite"
              disabled={butonDezactivat}
            />
            <Button
              disabled={butonDezactivat}
              className="w-1/2"
              color="error"
              variant="outlined"
              onClick={renunta}>
              Renunțare
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CardRaportare;
