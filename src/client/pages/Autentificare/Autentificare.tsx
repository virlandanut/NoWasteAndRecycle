import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginValues } from "../../types";
import { verificareLogin } from "../../utils/Validari";
import { useState } from "react";
import Header from "../../componente/Titluri/Header";
import MesajEroare from "../../componente/Erori/MesajEroare";
import InputAutentificare from "../../componente/Input/TextField/InputAutentificare";
import ButonSubmit from "../../componente/Butoane/ButonSubmit";
import ButonRedirect from "../../componente/Butoane/ButonRedirect";
import SectiuneButoane from "../../componente/Containere/Sectiuni/SectiuneButoane";
import SectiuneForm from "../../componente/Containere/Sectiuni/SectiuneForm";
import SectiuneMain from "../../componente/Containere/Sectiuni/SectiuneMain";
import SectiuneImagine from "../../componente/Containere/Sectiuni/SectiuneImagine";
import SectiunePaper from "../../componente/Containere/Sectiuni/SectiunePaper";

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
        setUtilizatorInvalid(true);
        throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
      }
    } catch (eroare) {
      console.log("Probleme la autentificare: ", eroare);
      setUtilizatorInvalid(true);
    }
  };

  const resetUtilizator = () => setUtilizatorInvalid(false);

  return (
    <SectiuneMain tailwind="flex justify-center items-center xs:w-80 md:w-96 lg:min-w-[750px]">
      <SectiunePaper tailwind="flex xs:flex-col xs:justify-center xs:items-center lg:flex-row lg:justify-center lg:items-center xl:flex-row">
        <SectiuneImagine
          tailwind="w-full h-1/2 flex justify-center items-center bg-[#a0e4b0] p-6"
          tailwindImagine="w-2/3"
          sursaImagine="/login.svg"
        />
        <SectiuneForm tailwind="w-full h-1/2 p-3">
          <form
            className="w-full h-1/2 flex flex-col xs:pt-2 xs:pb-2 xs:pl-2 xs:pr-2 xs:gap-2 md:gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <Header mesaj="Autentificare" marime="lg" />
            <SectiuneForm tailwind="flex flex-col gap-2">
              <InputAutentificare
                register={register}
                errors={errors}
                label="Nume de utilizator *"
                name="username"
                onClick={resetUtilizator}
                stateLogin={utilizatorInvalid}
                validari={verificareLogin.username}
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
              />
              {utilizatorInvalid && (
                <MesajEroare mesaj="Datele introduse nu sunt valide" />
              )}
            </SectiuneForm>
            <SectiuneButoane tailwind="flex xs:flex-col xs:w-full xs:gap-2 md:gap-3 lg:flex-row lg:items-center lg:justify-center">
              <ButonSubmit tailwind="lg:w-1/2" text="Autentificare" />
              <ButonRedirect
                tailwind="lg:w-1/2"
                catre="/register"
                text="Înregistrare"
              />
            </SectiuneButoane>
          </form>
        </SectiuneForm>
      </SectiunePaper>
    </SectiuneMain>
  );
}
