import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormFirma } from "../../../types";
import { verificareForm, verificareFormFirma } from "../../../utils/Validari";
import Header from "../../../componente/Titluri/Header";
import CAEN from "../../../componente/ComboBox/CAEN";
import InputFirma from "../../../componente/Input/TextField/InputFirma";
import SectiuneForm from "../../../componente/Containere/Sectiuni/SectiuneForm";
import SectiuneButoane from "../../../componente/Containere/Sectiuni/SectiuneButoane";
import SectiuneImagine from "../../../componente/Containere/Sectiuni/SectiuneImagine";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit";
import ButonRedirect from "../../../componente/Butoane/ButonRedirect";
import SectiuneMain from "../../../componente/Containere/Sectiuni/SectiuneMain";
import SectiunePaper from "../../../componente/Containere/Sectiuni/SectiunePaper";
import ContainerForm from "../../../componente/Containere/ContainerForm";
import { trimiteDateFirma } from "../../../utils/APIs/API";
import MesajEroare from "../../../componente/Erori/MesajEroare";
import { setareDatePrestabiliteFirma } from "../../../utils/Utilizatori";

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
    <SectiuneMain tailwind="flex justify-center items-center w-screen h-screen">
      <SectiunePaper tailwind="flex justify-center xs:flex-col xs:w-full xs:h-full xs:items-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl">
        <SectiuneImagine
          tailwind="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5 lg:w-full"
          sursaImagine="/signup.svg"
        />
        <ContainerForm tailwind="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3">
            <Header mesaj="Înregistrare" />
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
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
            </SectiuneForm>
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
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
            </SectiuneForm>
            <SectiuneForm>
              <InputFirma
                register={register}
                errors={errors}
                label="Adresă *"
                name="adresa"
                validari={verificareForm.adresa}
              />
            </SectiuneForm>
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
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
            </SectiuneForm>
            <SectiuneForm tailwind="flex xs:flex-col xs:gap-3 sm:flex-row">
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
            </SectiuneForm>
            {eroare && <MesajEroare mesaj={eroare} />}
            <SectiuneButoane tailwind="flex xs:flex-col xs:gap-3 md:flex-row">
              <ButonSubmit tailwind="md:w-1/2 xs:w-full" text="Creare Cont" />
              <ButonRedirect
                tailwind="md:w-1/2 xs:w-full"
                catre="/login"
                text="Autentificare"
              />
            </SectiuneButoane>
          </form>
        </ContainerForm>
      </SectiunePaper>
    </SectiuneMain>
  );
}
