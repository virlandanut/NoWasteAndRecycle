import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../../componente/Titluri/Header.js";
import InputFirma from "./Componente/InputFirma.js";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit.js";
import ButonRedirect from "../../../componente/Butoane/ButonRedirect.js";
import MesajEroare from "../../../componente/Erori/MesajEroare/MesajEroare.js";
import { setareDatePrestabiliteFirma } from "../../../../server/Utils/Functii/Functii_utilizatori.js";
import { Paper } from "@mui/material";
import Localitati from "../../../componente/ComboBox/Localitati.js";
import CAEN from "./Componente/CAEN.js";
import { FormFirma } from "./Interfete/Interfete.js";
import { trimiteDateFirma } from "./API/API.js";
import { verificareFormFirma } from "./Validari/Validari.js";
import { verificareForm } from "../Validari/Validari.js";

export default function InregistrareFirma() {
  const [eroare, setEroare] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFirma>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFirma> = async (formData) => {
    const data = setareDatePrestabiliteFirma(formData);
    try {
      await trimiteDateFirma(
        data,
        process.env.API_BASE + "/api/utilizatori/firma/new"
      );
      navigate("/login");
    } catch (eroare) {
      setEroare("Au existat probleme la crearea contului");
    }
  };
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <Paper className="flex justify-center xs:flex-col xs:w-full xs:h-full xs:items-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl">
        <section className="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5 lg:w-full">
          <img src="/signup.svg" alt="" />
        </section>
        <section className="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3">
            <Header mesaj="Înregistrare" />
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputFirma
                register={register}
                errors={errors}
                label="Denumire *"
                name="denumire_firma"
                validari={verificareFormFirma.denumire_firma}
              />
              <InputFirma
                register={register}
                errors={errors}
                label="CIF *"
                name="cif"
                validari={verificareFormFirma.cif}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <CAEN
                register={register}
                errors={errors}
                name="caen"
                validari={verificareFormFirma.caen}
              />
              <InputFirma
                register={register}
                errors={errors}
                label="Telefon *"
                name="telefon"
                validari={verificareForm.telefon}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputFirma
                register={register}
                errors={errors}
                label="Strada *"
                name="strada"
                validari={verificareForm.strada}
              />
              <InputFirma
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
                name="localitate"
                validari={verificareForm.localitate}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputFirma
                register={register}
                errors={errors}
                label="Nume de utilizator *"
                name="nume_utilizator"
                validari={verificareForm.nume_utilizator}
              />
              <InputFirma
                register={register}
                errors={errors}
                label="Email *"
                name="email"
                validari={verificareForm.email}
              />
            </section>
            <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
              <InputFirma
                register={register}
                errors={errors}
                label="Parolă *"
                name="parola"
                type="password"
                validari={verificareForm.parola}
              />
              <InputFirma
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
