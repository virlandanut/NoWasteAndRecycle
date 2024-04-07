import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginValues } from "../types";
import { verificareLogin } from "../utils/Validari";
import { useState } from "react";
import Header from "../componente/Titluri/Header";
import MesajEroare from "../componente/Erori/MesajEroare";
import InputAutentificare from "../componente/Input/TextField/InputAutentificare";
import ButonSubmit from "../componente/Butoane/ButonSubmit";
import ButonRedirect from "../componente/Butoane/ButonRedirect";
import SectiuneButoane from "../componente/Containere/Sectiuni/SectiuneButoane";
import { trimiteDateAutentificare } from "../utils/APIs/API";
import { Paper } from "@mui/material";

export default function Autentificare() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const [utilizatorInvalid, setUtilizatorInvalid] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      await trimiteDateAutentificare(
        data,
        process.env.API_BASE + "/api/utilizatori/login"
      );
      navigate("/");
    } catch (eroare) {
      setUtilizatorInvalid(true);
    }
  };

  const resetUtilizator = () => setUtilizatorInvalid(false);

  return (
    <main className="h-[100vh] flex justify-center items-center">
      <Paper className="flex xs:flex-col xs:justify-center xs:items-center xs:w-80 md:w-96 lg:min-w-[750px] lg:flex-row lg:justify-center lg:items-center xl:flex-row">
        <section
          className="w-full h-1/2 flex justify-center items-center bg-[#a0e4b0]
          p-6">
          <img className="w-2/3" src="/login.svg" alt="" />
        </section>
        <section className="w-full h-1/2 p-3">
          <form
            className="w-full h-1/2 flex flex-col xs:pt-2 xs:pb-2 xs:pl-2 xs:pr-2 xs:gap-2 md:gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <Header mesaj="Autentificare" marime="lg" />
            <div className="flex flex-col gap-2">
              <InputAutentificare
                register={register}
                errors={errors}
                label="Nume de utilizator *"
                name="nume_utilizator"
                onClick={resetUtilizator}
                stateLogin={utilizatorInvalid}
                validari={verificareLogin.nume_utilizator}
                autocomplete="username"
              />
              <InputAutentificare
                register={register}
                errors={errors}
                label="Parolă *"
                type="password"
                name="parola"
                onClick={resetUtilizator}
                stateLogin={utilizatorInvalid}
                validari={verificareLogin.parola}
                autocomplete="new-password"
              />
            </div>
            {utilizatorInvalid && (
              <div>
                <MesajEroare mesaj="Datele introduse nu sunt valide" />
              </div>
            )}
            <SectiuneButoane tailwind="flex xs:flex-col xs:w-full xs:gap-2 md:gap-3 lg:flex-row lg:items-center lg:justify-center">
              <ButonSubmit tailwind="lg:w-1/2" text="Autentificare" />
              <ButonRedirect
                tailwind="lg:w-1/2"
                catre="/register"
                text="Înregistrare"
              />
            </SectiuneButoane>
          </form>
        </section>
      </Paper>
    </main>
  );
}
