import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import "./InregistrarePersoana.css";
import { FormValues, verificareForm } from "../../utils/Validari";
import { validareUsername } from "../../../server/BD/SQL_Utilizatori/utilizatori";

export default function InregistrarePersoana() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);
  };

  return (
    <div className="background-container">
      <form className="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Înregistrare</h1>
        <div className="input">
          <div className="rand">
            <TextField
              {...register("nume", verificareForm.nume)}
              error={errors?.nume ? true : false}
              label="Nume *"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              name="nume"
              helperText={errors.nume && errors.nume.message}
            />
            <TextField
              {...register("prenume", verificareForm.prenume)}
              error={errors.prenume ? true : false}
              label="Prenume *"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              name="prenume"
              helperText={errors.prenume && errors.prenume.message}
            />
          </div>
        </div>

        <div className="input">
          <div className="rand">
            <TextField
              {...register("CNP", verificareForm.CNP)}
              error={errors.CNP ? true : false}
              label="CNP  *"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              name="CNP"
              helperText={errors.CNP && errors.CNP.message}
            />
            <TextField
              {...register("telefon", verificareForm.telefon)}
              error={errors.telefon ? true : false}
              label="Telefon *"
              color="success"
              variant="outlined"
              type="text"
              size="small"
              name="telefon"
              helperText={errors.telefon && errors.telefon.message}
            />
          </div>
        </div>
        <div className="input">
          <div className="rand">
            <TextField
              {...register("adresa", verificareForm.adresa)}
              error={errors.adresa ? true : false}
              label="Adresă *"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              style={{ width: "460px" }}
              name="adresa"
              helperText={errors.adresa && errors.adresa.message}
              InputProps={{ style: { width: "100%" } }}
            />
          </div>
        </div>
        <div className="input">
          <div className="rand">
            <TextField
              {...register("username", verificareForm.username)}
              error={errors.username ? true : false}
              label="Nume de utilizator *"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              name="username"
              helperText={errors.username && errors.username.message}
            />
            <TextField
              {...register("email", verificareForm.email)}
              error={errors.email ? true : false}
              label="Email *"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              name="email"
              helperText={errors.email && errors.email.message}
            />
          </div>
        </div>
        <div className="input">
          <div className="rand">
            <TextField
              {...register("parola", verificareForm.parola)}
              error={errors.parola ? true : false}
              label="Parolă *"
              color="success"
              variant="outlined"
              type="password"
              size="small"
              name="parola"
              helperText={errors.parola && errors.parola.message}
            />
            <TextField
              {...register("confirmareParola", verificareForm.confirmareParola)}
              error={errors.confirmareParola ? true : false}
              label="Confirmare parolă *"
              color="success"
              variant="outlined"
              type="password"
              size="small"
              name="confirmareParola"
              helperText={
                errors.confirmareParola && errors.confirmareParola.message
              }
            />
          </div>
        </div>
        <div className="butoane">
          <Button
            type="submit"
            style={{ marginRight: "20px" }}
            variant="contained"
            color="success"
            size="large">
            Creare Cont
          </Button>
          <Button
            style={{ marginLeft: "25px" }}
            variant="outlined"
            color="success"
            size="large">
            Autentificare
          </Button>
        </div>
      </form>
    </div>
  );
}
