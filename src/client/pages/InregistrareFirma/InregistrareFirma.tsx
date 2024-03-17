import { Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormFirma } from "../../types";
import { verificareForm, verificareFormFirma } from "../../utils/Validari";
import Header from "../../componente/Titluri/Header";
import CAEN from "../../componente/ComboBox/CAEN";
import InputText from "../../componente/Input/TextField/InputFirma";

export default function InregistrareFirma() {
  const [eroare, setEroare] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFirma>();

  const navigate = useNavigate();

  const onSubmit = (data: FormFirma) => console.log(data);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Paper
        className="flex xs:flex-col xs:w-full xs:h-full xs:items-center justify-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl"
        variant="elevation"
        elevation={3}>
        <div className="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5 lg:w-full">
          <img src="/signup.svg"></img>
        </div>
        <div className="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3">
            <Header mesaj="Înregistrare" />
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row sm:justify-center">
                <InputText
                  register={register}
                  errors={errors}
                  label="Denumire *"
                  name="denumire"
                  validari={verificareFormFirma.denumire}
                />
                <InputText
                  register={register}
                  errors={errors}
                  label="CIF *"
                  name="cif"
                  validari={verificareFormFirma.cif}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <CAEN
                  register={register}
                  errors={errors}
                  name="caen"
                  validari={verificareFormFirma.caen}
                />
                <InputText
                  register={register}
                  errors={errors}
                  label="Telefon *"
                  name="telefon"
                  validari={verificareForm.telefon}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3">
                <InputText
                  register={register}
                  errors={errors}
                  label="Adresă *"
                  name="adresa"
                  validari={verificareForm.adresa}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <InputText
                  register={register}
                  errors={errors}
                  label="Nume de utilizator *"
                  name="username"
                  validari={verificareForm.username}
                />
                <InputText
                  register={register}
                  errors={errors}
                  label="Email *"
                  name="email"
                  validari={verificareForm.email}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <InputText
                  register={register}
                  errors={errors}
                  label="Parolă *"
                  name="parola"
                  validari={verificareForm.parola}
                />
                <InputText
                  register={register}
                  errors={errors}
                  label="Confirmare parolă *"
                  name="confirmareParola"
                  validari={verificareForm.confirmareParola}
                />
              </div>
            </div>
            <div className="flex xs:flex-col w-full xs:gap-3 md:flex-row">
              <Button
                className="md:w-1/2 xs:w-full"
                type="submit"
                variant="contained"
                color="success"
                size="large">
                Creare Cont
              </Button>
              <Link className="md:w-1/2 xs:w-full" to="/login">
                <Button
                  className="w-full"
                  variant="outlined"
                  color="success"
                  size="large">
                  Autentificare
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
