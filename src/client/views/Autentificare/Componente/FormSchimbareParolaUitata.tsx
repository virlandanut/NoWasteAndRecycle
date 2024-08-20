import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchimbareParola } from "../Interfete";
import { Button, TextField } from "@mui/material";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit";
import React from "react";
import Header from "../../../componente/Titluri/Header";
import { InterfataNotificare } from "../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../componente/Erori/Notificare/Notificare";

interface FormSchimbareParolaUitataProps {
  setSchimbareParola: (value: boolean) => void;
}

export const FormSchimbareParolaUitata = (
  props: FormSchimbareParolaUitataProps
) => {
  const [formularTrimis, setFormularTrimis] = React.useState<boolean>(false);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchimbareParola>();

  const onSubmit: SubmitHandler<FormSchimbareParola> = async (data) => {
    setFormularTrimis(true);
    try {
      const api: string | undefined = process.env.API_UTILIZATOR;
      if (!api) {
        setNotificare({
          open: true,
          mesaj: "API schimbare parolă eronat",
          tip: "eroare",
        });
        return;
      }
      await fetch(api + "resetare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Au existat probleme la conectarea cu server-ul",
        tip: "eroare",
      });
    }
  };

  return !formularTrimis ? (
    <form
      className="flex flex-col gap-4 w-full h-1/2 xs:pt-2 xs:pb-2 xs:pl-2 xs:pr-2 xs:gap-2 md:gap-3"
      onSubmit={handleSubmit(onSubmit)}>
      <Header mesaj="Resetare parolă" marime="lg" />
      <TextField
        {...register("nume_utilizator", {
          required: "Numele de utilizator este obligatoriu",
        })}
        error={!!errors["nume_utilizator"]}
        className="w-full"
        size="small"
        color="success"
        label="Nume utilizator *"
        helperText={
          errors["nume_utilizator"] && errors["nume_utilizator"]?.message
        }
      />
      <TextField
        {...register("email", {
          required: "Adresa de email este obligatorie",
          validate: {
            validareEmail: async (value: string) => {
              if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
                return "Adresa de email este invalidă";
              }
            },
          },
        })}
        error={!!errors["email"]}
        className="w-full"
        size="small"
        color="success"
        label="Email * "
        helperText={errors["email"] && errors["email"]?.message}
      />
      <section className="w-full flex gap-2">
        <ButonSubmit tailwind="w-1/2" text="Resetează" />
        <Button
          onClick={() => {
            props.setSchimbareParola(false);
          }}
          className="w-1/2"
          color="success"
          variant="outlined">
          Înapoi
        </Button>
      </section>
    </form>
  ) : (
    <div className="flex flex-col gap-4">
      <Header mesaj="Cererea a fost înregistrată" marime="xl" />
      <p className="text-xs text-gray-500 text-center">
        Dacă datele specificate sunt asociate cu un cont existent, atunci veți
        primi un email cu o parolă temporară pe care o puteți folosi să vă
        autentificați.
      </p>
      <Button
        onClick={() => {
          props.setSchimbareParola(false);
        }}
        className="w-full"
        color="success"
        variant="outlined">
        Înapoi
      </Button>
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </div>
  );
};
