import { Button, Paper, TextField } from "@mui/material";
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
        throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
      }
    } catch (eroare) {
      console.log("Probleme la autentificare: ", eroare);
      setEroare(true);
    }
  };

  return (
    <div className="flex justify-center items-center sm:w-80 md:w-96 lg:min-w-[750px]">
      <Paper
        className="flex sm:flex-col sm:justify-center sm:items-center lg:flex-row lg:justify-center lg:items-center xl:flex-row "
        variant="elevation"
        elevation={3}>
        <div className="w-full h-1/2 flex justify-center items-center bg-[#a0e4b0] p-6">
          <img className="w-2/3" src="/login.svg" alt="" />
        </div>
        <div className="w-full h-1/2 flex justify-center items-center p-3">
          <form
            className="w-full h-1/2 flex flex-col justify-center items-center sm:pt-2 sm:pb-2 sm:pl-2 sm:pr-2 sm:gap-2 md:gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-green-700 text-center">
              Autentificare
            </h1>
            <TextField
              className="w-full sm:mb-10"
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
            <TextField
              className="w-full"
              {...register("parola", verificareLogin.parola)}
              error={(eroare ? true : false) || (errors?.parola ? true : false)}
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
            <div className="flex sm:flex-col sm:w-full sm:gap-2 md:gap-3 lg:flex-row lg:items-center lg:justify-center">
              <Button
                className="lg:w-1/2"
                type="submit"
                variant="contained"
                color="success">
                Autentificare
              </Button>
              <Button className="lg:w-1/2" variant="outlined" color="success">
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
