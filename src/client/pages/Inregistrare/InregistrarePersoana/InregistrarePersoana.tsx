import { Paper } from "@mui/material";
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
import SectiuneForm from "../../../componente/Sectiuni/SectiuneForm.js";
import SectiuneButoane from "../../../componente/Sectiuni/SectiuneButoane.js";
import ButonCreareCont from "../../../componente/Butoane/CatreLogare/ButonCreareCont.js";
import ButtonLogin from "../../../componente/Butoane/CatreLogare/ButonLogin.js";
import SectiuneImagine from "../../../componente/Sectiuni/SectiuneImagine.js";

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
    <div className="flex justify-center items-center w-screen h-screen">
      <Paper
        variant="elevation"
        className="flex xs:flex-col xs:w-full xs:h-full xs:items-center justify-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl"
        elevation={3}>
        <SectiuneImagine sursaImagine="/signup.svg" />
        <div className="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <Header mesaj="Înregistrare" />
            <SectiuneForm>
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
            <SectiuneForm>
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
            <InputPersoana
              register={register}
              errors={errors}
              label="Adresă *"
              name="adresa"
              validari={verificareForm.adresa}
            />
            <SectiuneForm>
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
            <SectiuneForm>
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
            <SectiuneButoane>
              <ButonCreareCont />
              <ButtonLogin />
            </SectiuneButoane>
            {eroare && <MesajEroare mesaj={eroare} />}
          </form>
        </div>
      </Paper>
    </div>
  );
}
