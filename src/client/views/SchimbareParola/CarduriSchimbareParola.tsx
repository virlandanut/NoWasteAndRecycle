import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { useForm } from "react-hook-form";
import InputSchimbareParola from "./Componente/InputSchimbareParola.js";
import ButonSubmit from "../../componente/Butoane/ButonSubmit.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { FormSchimbareParola } from "./Interfete.js";
import { Utilizator } from "@prisma/client";
import { ContextUtilizatorCurent } from "../../componente/Erori/RutaProtejata.js";
import React from "react";

interface CarduriSchimbareParolaProps {
  schimbareParola: boolean;
  inchideSchimbareParola: () => void;
  renunta: () => void;
}

const CarduriSchimbareParola = ({
  schimbareParola,
  inchideSchimbareParola,
  renunta,
}: CarduriSchimbareParolaProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchimbareParola>();

  const { utilizatorCurent, setUtilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [succes, setSucces] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);
  const navigate = useNavigate();


  const onSubmit = async (data: FormSchimbareParola) => {
    if (!utilizatorCurent) {
      setFail(true);
      return;
    }
    const idUtilizator = utilizatorCurent.id_utilizator;
    const { parolaNouaRepetata, ...newData } = data;
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/utilizatori/update/parola",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUtilizator, ...newData }),
        }
      );
      if (raspuns.status === 401) {
        setFail(true);
      }
      if (raspuns.status === 200) {
        setFail(false);
        setSucces(true);
        setTimeout(async () => {
          try {
            const response = await fetch(
              "http://localhost:3000/api/utilizatori/logout",
              { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            if (!response.ok) {
              throw new Error("Utilizatorul nu a putut fi deconectat");
            }
            navigate("/login", { replace: true });
          } catch (eroare) {
            console.log("Logout error: ", eroare);
          }
        }, 1000);
      }

    } catch (eroare) {
      console.log(eroare);
    }

  };
  return (
    <Dialog open={schimbareParola} onClose={inchideSchimbareParola}>
      <DialogContent sx={{ padding: 0 }}>
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2 mt-4">
            <LockResetRoundedIcon color="success" />
            <span className="font-bold uppercase text-green-600">
              Schimbă parola
            </span>
          </div>
        </DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4">
          <InputSchimbareParola
            autocomplete="current-password"
            register={register}
            errors={errors}
            name="parolaVeche"
            label="Parolă veche"
          />
          <InputSchimbareParola
            autocomplete="new-password"
            register={register}
            errors={errors}
            name="parolaNoua"
            label="Parolă nouă"
          />
          <InputSchimbareParola
            autocomplete="new-password"
            register={register}
            errors={errors}
            name="parolaNouaRepetata"
            label="Confirmare parolă"
          />
          {succes && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Parola a fost modificată cu succes!
            </Alert>
          )}
          {fail && <Alert severity="error">Parola curentă este eronată</Alert>}
          <section className="flex gap-2">
            <ButonSubmit tailwind="w-1/2" text="Confirmă" />
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
    </Dialog>
  );
};

export default CarduriSchimbareParola;
