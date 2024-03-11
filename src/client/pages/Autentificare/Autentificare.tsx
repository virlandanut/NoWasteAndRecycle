import { Button, Checkbox, Paper, TextField } from "@mui/material";
import "./Autentificare.css";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginValues } from "../../types";
import { verificareLogin } from "../../utils/Validari";
import { useState } from "react";

export default function Autentificare() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const [eroare, setEroare] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      const raspuns = await fetch(process.env.API_BASE + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (raspuns.ok) {
        navigate("/");
      } else {
        setEroare(true);
      }
    } catch (eroare) {
      console.log("Probleme la autentificare: ", eroare);
    }
  };

  return (
    <div className="container">
      <Paper variant="elevation" className="SignInForm" elevation={3}>
        <div className="imagine">
          <img className="loginImage" src="/login.svg" alt="" />
        </div>
        <div className="container-form">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Autentificare</h1>
            <div className="input">
              <TextField
                {...register("username", verificareLogin.username)}
                error={
                  (eroare ? true : false) || (errors?.username ? true : false)
                }
                label="Nume de utilizator"
                color="success"
                type="text"
                variant="outlined"
                size="small"
                name="username"
                helperText={errors && errors.username?.message}
              />
            </div>
            <div className="input">
              <TextField
                {...register("parola", verificareLogin.parola)}
                error={
                  (eroare ? true : false) || (errors?.parola ? true : false)
                }
                label="Parolă"
                color="success"
                variant="outlined"
                type="password"
                size="small"
                name="parola"
                helperText={
                  (eroare && "Datele sunt incorecte") ||
                  (errors && errors.username?.message)
                }
              />
            </div>
            <div className="butoane">
              <Button type="submit" variant="contained" color="success">
                Autentificare
              </Button>
              <Button variant="outlined" color="success">
                <Link style={{ color: "green" }} to="/register">
                  Înregistrare
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
