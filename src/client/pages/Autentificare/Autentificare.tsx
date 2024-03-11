import { Button, TextField } from "@mui/material";
import "./Autentificare.css";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginValues } from "../../types";
import { verificareLogin } from "../../utils/Validari";

export default function Autentificare() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    console.log(data);
    try {
      await fetch(process.env.API_BASE + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    } catch (eroare) {
      console.log("Probleme la autentificare: ", eroare);
    }
  };

  return (
    <div className="background-container">
      <form className="SignInForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Autentificare</h1>
        <div className="input">
          <TextField
            {...register("username", verificareLogin.username)}
            error={errors?.username ? true : false}
            label="Nume de utilizator"
            color="success"
            type="text"
            variant="outlined"
            size="small"
            name="username"
            helperText={errors.username && errors.username.message}
          />
        </div>
        <div className="input">
          <TextField
            {...register("parola", verificareLogin.parola)}
            error={errors?.parola ? true : false}
            label="Parolă"
            color="success"
            variant="outlined"
            type="password"
            size="small"
            name="parola"
            helperText={errors.parola && errors.parola.message}
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
  );
}
