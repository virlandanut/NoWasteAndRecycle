import { SubmitHandler, useForm } from "react-hook-form";
import { verificareFormPersoana } from "./Validari/Validari.js";
import { useNavigate } from "react-router-dom";
import { setareDatePrestabilitePersoana } from "../../../../server/Utils/Functii/Functii_utilizatori.js";
import { useState } from "react";
import MesajEroare from "../../../componente/Erori/MesajEroare/MesajEroare.js";
import Header from "../../../componente/Titluri/Header.js";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit.js";
import ButonRedirect from "../../../componente/Butoane/ButonRedirect.js";
import { Paper } from "@mui/material";
import Localitati from "../../../componente/ComboBox/Localitati.js";
import { verificareForm } from "../Validari/Validari.js";
import { FormPersoana } from "./Interfete/Interfete.js";
import { trimiteDatePersoana } from "./API/API.js";
import InputPersoana from "./Componente/InputPersoana.js";

export default function InregistrarePersoana() {
  const [eroare, setEroare] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPersoana>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormPersoana> = async (formData) => {
    const data = setareDatePrestabilitePersoana(formData);
    try {
      await trimiteDatePersoana(
        data,
        process.env.API_BASE + "/api/utilizatori/persoana/new"
      );
      navigate("/login");
    } catch (eroare) {
      setEroare("Au existat probleme la crearea contului");
    }
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <Paper className="flex xs:flex-col xs:w-full xs:h-full xs:items-center justify-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl">
        <section className="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5">
          <img src="/signup.svg" alt="" />
        </section>
        <section className="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <Header mesaj="Înregistrare" />
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
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
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="CNP *"
                name="cnp"
                validari={verificareFormPersoana.cnp}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Telefon *"
                name="telefon"
                validari={verificareForm.telefon}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="Stradă *"
                name="strada"
                validari={verificareForm.strada}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Număr *"
                name="numar"
                validari={verificareForm.numar}
              />
            </section>
            <section>
              <Localitati
                register={register}
                errors={errors}
                label="Localitate *"
                name="localitate"
                validari={verificareForm.localitate}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputPersoana
                register={register}
                errors={errors}
                label="Nume de utilizator *"
                name="nume_utilizator"
                validari={verificareForm.nume_utilizator}
              />
              <InputPersoana
                register={register}
                errors={errors}
                label="Email *"
                name="email"
                validari={verificareForm.email}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
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
                name="confirmare_parola"
                type="password"
                validari={verificareForm.confirmare_parola}
              />
            </section>
            {eroare && <MesajEroare mesaj={eroare} />}
            <section className="flex xs:flex-col xs:gap-3 md:flex-row">
              <ButonSubmit tailwind="md:w-1/2 xs:w-full" text="Creare Cont" />
              <ButonRedirect
                tailwind="md:w-1/2 xs:w-full"
                catre="/login"
                text="Autentificare"
              />
            </section>
          </form>
        </section>
      </Paper>
    </main>
  );
}
