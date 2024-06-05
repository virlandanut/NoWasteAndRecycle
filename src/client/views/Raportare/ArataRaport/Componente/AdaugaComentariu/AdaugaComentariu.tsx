import { useForm } from "react-hook-form";
import {
  AdaugaComentariuProps,
  DateComentariu,
  FormComentariu,
  Notificare,
} from "./Interfete";
import Mesaj from "./Componente/Mesaj";
import ButonSubmit from "../../../../../componente/Butoane/ButonSubmit";
import { useEffect, useState } from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import { validariFormComentariu } from "./Validari";

const AdaugaComentariu = ({ id_raport_problema, setRandeazaDinNou }: AdaugaComentariuProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormComentariu>();
  const [notificare, setNotificare] = useState<Notificare>({
    open: false,
    mesaj: "",
    culoare: "",
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setRandeazaDinNou();
    }
  }, [isSubmitSuccessful, reset, setRandeazaDinNou]);

  const onSubmit = async (data: FormComentariu) => {
    const comentariu: DateComentariu = {
      id_raport_problema: id_raport_problema,
      mesaj: data.mesaj,
    };
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/comentariu/new",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...comentariu }),
        }
      );
      if (!raspuns.ok) {
        if (raspuns.status === 403) {
          setNotificare({
            open: true,
            mesaj:
              "Nu aveți permisiune să postați un comentariu la acest tichet!",
            culoare: "#ef5350",
          });
        }
        setNotificare({
          open: true,
          mesaj: "Comentariul nu a putut fi adăugat!",
          culoare: "#ef5350",
        });
      } else {
        setNotificare({
          open: true,
          mesaj: "Comentariul a fost adăugat cu succes!",
          culoare: "#15803d",
        });
      }
    } catch (eroare) {
      console.log(eroare);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Mesaj
          register={register}
          errors={errors}
          name="mesaj"
          placeholder="Adaugă un comentariu"
          validari={validariFormComentariu.mesaj}
        />
        <ButonSubmit tailwind="self-end" text="Adaugă comentariu" />
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setNotificare({ open: false, mesaj: "", culoare: "" })}
        open={notificare.open}
        autoHideDuration={2500}>
        <SnackbarContent
          style={{ backgroundColor: notificare.culoare }}
          message={<span className="font-semibold">{notificare.mesaj}</span>}
        />
      </Snackbar>
    </div>
  );
};

export default AdaugaComentariu;
