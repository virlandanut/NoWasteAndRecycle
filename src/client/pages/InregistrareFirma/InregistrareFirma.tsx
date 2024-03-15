import { Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormFirma } from "../../types";
import { verificareFormFirma } from "../../utils/Validari";

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
            <h1 className="font-bold text-green-700 text-center uppercase lg:text-xl">
              Înregistrare
            </h1>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row sm:justify-center">
                <TextField
                  className="w-full"
                  {...register("denumire", verificareFormFirma.denumire)}
                  error={errors?.denumire ? true : false}
                  label="Denumire *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="denumire"
                  helperText={errors.denumire && errors.denumire.message}
                />
                <TextField
                  className="w-full"
                  {...register("cif", verificareFormFirma.cif)}
                  error={errors?.cif ? true : false}
                  label="CIF *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="cif"
                  helperText={errors.cif && errors.cif.message}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <TextField
                  className="w-full"
                  {...register("caen")}
                  label="CAEN *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="caen"
                />
                <TextField
                  className="w-full"
                  {...register("telefon")}
                  label="Telefon *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="telefon"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3">
                <TextField
                  className="w-full"
                  {...register("adresa")}
                  label="Adresă *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="adresa"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <TextField
                  className="w-full"
                  {...register("username")}
                  label="Nume de utilizator *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="username"
                />
                <TextField
                  className="w-full"
                  {...register("email")}
                  label="Email *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="email"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <TextField
                  className="w-full"
                  {...register("parola")}
                  label="Parolă *"
                  color="success"
                  variant="outlined"
                  type="password"
                  size="small"
                  name="parola"
                />
                <TextField
                  className="w-full"
                  {...register("confirmareParola")}
                  label="Confirmare parolă *"
                  color="success"
                  variant="outlined"
                  type="password"
                  size="small"
                  name="confirmareParolă"
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
