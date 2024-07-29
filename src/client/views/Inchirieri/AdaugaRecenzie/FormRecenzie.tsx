import React from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { ContextUtilizatorCurent } from "../../../componente/Erori/RutaProtejata";
import { InterfataNotificare } from "../../../componente/Erori/Notificare/Interfete";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit";
import Notificare from "../../../componente/Erori/Notificare/Notificare";

interface FormAdaugaRecenzie {
  scor: number;
  mesaj: string;
}

interface CardAdaugaRecenzieProps {
  idContainer: number;
  adaugaRecenzie: boolean;
  inchideAdaugaRecenzie: () => void;
  renunta: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const verificareFormAdaugaRecenzie: Record<
  keyof FormAdaugaRecenzie,
  RegisterOptions
> = {
  mesaj: {
    required: "Mesajul este obligatoriu",
    minLength: { value: 20, message: "Minim 40 de caractere" },
    maxLength: { value: 100, message: "Maxim 80 de caractere" },
  },
  scor: {
    min: { value: 1, message: "Scorul minim este 1" },
    max: { value: 5, message: "Scorul maxim este 5" },
  },
};

const FormRecenzie: React.FC<CardAdaugaRecenzieProps> = ({
  idContainer,
  adaugaRecenzie,
  inchideAdaugaRecenzie,
  renunta,
  setRefresh,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormAdaugaRecenzie>();

  const [scor, setScor] = React.useState<number | null>(2);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const resetNotificare = () => {
    setNotificare({
      open: false,
      mesaj: "",
      tip: "",
    });
  };

  const onSubmit = async (data: FormAdaugaRecenzie) => {
    try {
      const api: string | undefined = process.env.API_RECENZIE;
      if (!api) {
        setNotificare({
          open: true,
          mesaj: "API-ul de adăugare a recenziei este eronat",
          tip: "eroare",
        });
        return;
      }
      const raspuns = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, idContainer }),
      });
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
        setTimeout(() => {
          renunta();
          resetNotificare();
          reset();
        }, 1000);
        return;
      } else {
        const server = await raspuns.json();
        setNotificare({
          open: true,
          mesaj: server.mesaj,
          tip: "succes",
        });
        setTimeout(() => {
          renunta();
          setRefresh((v) => !v);
          reset();
        }, 1000);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Recenzia nu a putut fi adăugată",
        tip: "eroare",
      });
    }
  };

  return (
    <Dialog open={adaugaRecenzie} onClose={inchideAdaugaRecenzie}>
      <DialogContent sx={{ padding: 0 }}>
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2 mt-4">
            <span className="font-bold uppercase text-green-600">
              Adaugă recenzie
            </span>
          </div>
        </DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 w-96">
          <Rating
            size="large"
            className="w-full"
            value={scor}
            precision={0.5}
            onChange={(event, valoareNoua) => {
              setScor(valoareNoua);
              setValue("scor", valoareNoua ? valoareNoua : 0);
            }}
          />
          <TextField
            multiline
            rows={7}
            className="w-full h-full"
            {...register("mesaj", verificareFormAdaugaRecenzie.mesaj)}
            error={!!errors["mesaj"]}
            label="Mesaj"
            color="success"
            type="text"
            variant="outlined"
            size="small"
            name="mesaj"
            helperText={errors["mesaj"] && errors["mesaj"]?.message}
          />
          <section className="flex gap-2">
            <ButonSubmit tailwind="w-1/2" text="Adaugă" />
            <Button
              className="w-1/2"
              color="error"
              variant="outlined"
              onClick={() => {
                resetNotificare();
                renunta();
                reset();
              }}>
              Renunțare
            </Button>
          </section>
        </form>
      </DialogContent>
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </Dialog>
  );
};

export default FormRecenzie;
