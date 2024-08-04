import React from "react";
import { useForm } from "react-hook-form";
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
import {
  CardAdaugaRecenzieProps,
  IFormRecenzie,
  verificareFormAdaugaRecenzie,
} from "../Interfete";

const FormRecenzie: React.FC<CardAdaugaRecenzieProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormRecenzie>();

  const [scor, setScor] = React.useState<number | null>(null);
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

  const onSubmit = async (data: IFormRecenzie) => {
    if (scor === 0) {
      setNotificare({
        open: true,
        mesaj: "Scorul trebuie să fie mai mare decât 0",
        tip: "eroare",
      });
      return;
    }
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
        body: JSON.stringify({ ...data, idContainer: props.idContainer }),
      });
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
        setTimeout(() => {
          props.renunta();
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
          props.renunta();
          props.setRefresh((v) => !v);
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
    <Dialog open={props.adaugaRecenzie} onClose={props.inchideAdaugaRecenzie}>
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
                props.renunta();
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
