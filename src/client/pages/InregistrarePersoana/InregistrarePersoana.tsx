import { Button, Paper, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import "./InregistrarePersoana.css";
import { verificareForm } from "../../utils/Validari.js";
import { FormValues } from "../../types.js";
import { Link, useNavigate } from "react-router-dom";
import { setareDatePrestabilite } from "../../utils/Utilizatori";
import { useState } from "react";

export default function InregistrarePersoana() {
  const [eroare, setEroare] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const data = setareDatePrestabilite(formData);
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/utilizatori/persoana/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspuns.ok) {
        throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
      }
      navigate("/");
    } catch (eroare) {
      console.log("Eroare la adaugarea utilizatorului: ", eroare);
      setEroare("Au existat probleme la crearea contului.");
    }
  };

  return (
    <div className="container">
      <Paper variant="elevation" className="SignUpForm" elevation={3}>
        <div className="imagineSignUp">
          <img className="registerImage" src="/signup.svg" alt="" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  style={{ width: "465px" }}
                  name="adresa"
                  helperText={errors.adresa && errors.adresa.message}
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
                  {...register(
                    "confirmareParola",
                    verificareForm.confirmareParola
                  )}
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
                variant="contained"
                color="success"
                size="large">
                Creare Cont
              </Button>
              <Button variant="outlined" color="success" size="large">
                <Link style={{ color: "green" }} to="/login">
                  Autentificare
                </Link>
              </Button>
            </div>
            {eroare && <p style={{ color: "red" }}>{eroare}</p>}
          </form>
        </div>
      </Paper>
    </div>
  );
}