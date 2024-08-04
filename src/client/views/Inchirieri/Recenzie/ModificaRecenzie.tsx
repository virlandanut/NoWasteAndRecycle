import React from "react";
import { useForm } from "react-hook-form";
import { InterfataNotificare } from "../../../componente/Erori/Notificare/Interfete";
import {
  CardModificaRecenzieProps,
  IFormRecenzie,
  verificareFormAdaugaRecenzie,
} from "../Interfete";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  styled,
  TextField,
} from "@mui/material";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit";
import Notificare from "../../../componente/Erori/Notificare/Notificare";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export const FormModificaRecenzie: React.FC<CardModificaRecenzieProps> = (
  props
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormRecenzie>();

  const [scor, setScor] = React.useState<number>(0);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  React.useEffect(() => {
    const fetchDate = async () => {
      try {
        const api: string | undefined = process.env.API_RECENZIE;
        if (!api) {
          setNotificare({
            open: true,
            mesaj: "API-ul de modificare a recenziei este eronat",
            tip: "eroare",
          });
          return;
        }
        const raspuns = await fetch(api + `/${props.idRecenzie}`);
        if (!raspuns.ok) {
          const eroare = await raspuns.json();
          setNotificare({
            open: true,
            mesaj: eroare.mesaj,
            tip: "eroare",
          });
          return;
        }

        const data = await raspuns.json();
        setScor(data.scor);
        setValue("scor", data.scor);
        setValue("mesaj", data.mesaj);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj: "Datele recenziei nu au putut fi obținute de la server",
          tip: "eroare",
        });
      }
    };
    fetchDate();
  }, [refresh]);

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
          mesaj: "API-ul de modificare a recenziei este eronat",
          tip: "eroare",
        });
        return;
      }
      const raspuns = await fetch(api, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, idRecenzie: props.idRecenzie }),
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
          setRefresh((v) => !v);
          resetNotificare();
          reset();
        }, 1000);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Recenzia nu a putut fi editată",
        tip: "eroare",
      });
    }
  };

  let culoare: string;
  if (scor < 3) {
    culoare = "#f44336";
  } else if (scor >= 3 && scor < 4) {
    culoare = "#ffa726";
  } else {
    culoare = "#66bb6a";
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: culoare,
    },
  });

  return (
    <Dialog
      open={props.modificaRecenzie}
      onClose={props.inchideModificaRecenzie}>
      <DialogContent sx={{ padding: 0 }}>
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2 mt-4">
            <span className="font-bold uppercase text-green-600">
              Modifică recenzie
            </span>
          </div>
        </DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 w-96">
          <StyledRating
            size="large"
            className="w-full"
            value={scor}
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarOutlineIcon fontSize="inherit" />}
            onChange={(event, valoareNoua) => {
              setScor(valoareNoua ? valoareNoua : 0);
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
