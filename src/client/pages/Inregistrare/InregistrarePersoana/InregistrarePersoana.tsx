import { SubmitHandler, useForm } from "react-hook-form";
import {
  verificareForm,
  verificareFormPersoana,
} from "../../../utils/Validari.js";
import { FormPersoana } from "../../../types.js";
import { useNavigate } from "react-router-dom";
import { setareDatePrestabilite } from "../../../utils/Utilizatori.js";
import { useState } from "react";
import MesajEroare from "../../../componente/Erori/MesajEroare.js";
import Header from "../../../componente/Titluri/Header.js";
import InputPersoana from "../../../componente/Input/TextField/InputPersoana.js";
import SectiuneForm from "../../../componente/Containere/Sectiuni/SectiuneForm.js";
import SectiuneButoane from "../../../componente/Containere/Sectiuni/SectiuneButoane.js";
import SectiuneImagine from "../../../componente/Containere/Sectiuni/SectiuneImagine.js";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit.js";
import ButonRedirect from "../../../componente/Butoane/ButonRedirect.js";
import SectiuneMain from "../../../componente/Containere/Sectiuni/SectiuneMain.js";
import SectiunePaper from "../../../componente/Containere/Sectiuni/SectiunePaper.js";
import ContainerForm from "../../../componente/Containere/ContainerForm.js";

export default function InregistrarePersoana() {
  const [eroare, setEroare] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPersoana>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormPersoana> = async (formData) => {
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
    <SectiuneMain tailwind="flex justify-center items-center w-screen h-screen">
      <SectiunePaper tailwind="flex xs:flex-col xs:w-full xs:h-full xs:items-center justify-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl">
        <SectiuneImagine
          tailwind="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5 lg:w-full"
          sursaImagine="/signup.svg"
        />
        <ContainerForm tailwind="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <Header mesaj="Înregistrare" />
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="Nume *"
                name="nume"
                validari={verificareFormPersoana.nume}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Prenume *"
                name="prenume"
                validari={verificareFormPersoana.prenume}
              />
            </SectiuneForm>
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="CNP *"
                name="CNP"
                validari={verificareFormPersoana.CNP}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Telefon *"
                name="telefon"
                validari={verificareForm.telefon}
              />
            </SectiuneForm>
            <SectiuneForm>
              <InputPersoana
                register={register}
                errors={errors}
                label="Adresă *"
                name="adresa"
                validari={verificareForm.adresa}
              />
            </SectiuneForm>
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="Nume de utilizator *"
                name="username"
                validari={verificareForm.username}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Email *"
                name="email"
                validari={verificareForm.email}
              />
            </SectiuneForm>
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="Parolă *"
                name="parola"
                type="password"
                validari={verificareForm.parola}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Confirmare parolă *"
                name="confirmareParola"
                type="password"
                validari={verificareForm.confirmareParola}
              />
            </SectiuneForm>
            <SectiuneButoane tailwind="flex xs:flex-col xs:gap-3 md:flex-row">
              <ButonSubmit tailwind="md:w-1/2 xs:w-full" text="Creare Cont" />
              <ButonRedirect
                tailwind="md:w-1/2 xs:w-full"
                catre="/login"
                text="Autentificare"
              />
            </SectiuneButoane>
            {eroare && <MesajEroare mesaj={eroare} />}
          </form>
        </ContainerForm>
      </SectiunePaper>
    </SectiuneMain>
  );
}
