import { Paper } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormFirma } from "../../../types";
import { verificareForm, verificareFormFirma } from "../../../utils/Validari";
import Header from "../../../componente/Titluri/Header";
import CAEN from "../../../componente/ComboBox/CAEN";
import InputFirma from "../../../componente/Input/TextField/InputFirma";
import SectiuneForm from "../../../componente/Sectiuni/SectiuneForm";
import SectiuneButoane from "../../../componente/Sectiuni/SectiuneButoane";
import ButonLogin from "../../../componente/Butoane/CatreLogare/ButonLogin";
import ButonCreareCont from "../../../componente/Butoane/CatreLogare/ButonCreareCont";
import SectiuneImagine from "../../../componente/Sectiuni/SectiuneImagine";

export default function InregistrareFirma() {
  const [eroare, setEroare] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFirma>();

  const navigate = useNavigate();

  const onSubmit = (data: FormFirma) => console.log(data);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Paper
        className="flex xs:flex-col xs:w-full xs:h-full xs:items-center justify-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl"
        variant="elevation"
        elevation={3}>
        <SectiuneImagine sursaImagine="/signup.svg" />
        <div className="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3">
            <Header mesaj="Înregistrare" />
            <SectiuneForm>
              <InputFirma
                register={register}
                errors={errors}
                label="Denumire *"
                name="denumire"
                validari={verificareFormFirma.denumire}
              />
              <InputFirma
                register={register}
                errors={errors}
                label="CIF *"
                name="cif"
                validari={verificareFormFirma.cif}
              />
            </SectiuneForm>
            <SectiuneForm>
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
            <InputFirma
              register={register}
              errors={errors}
              label="Adresă *"
              name="adresa"
              validari={verificareForm.adresa}
            />
            <SectiuneForm>
              <InputFirma
                register={register}
                errors={errors}
                label="Nume de utilizator *"
                name="username"
                validari={verificareForm.username}
              />
              <InputFirma
                register={register}
                errors={errors}
                label="Email *"
                name="email"
                validari={verificareForm.email}
              />
            </SectiuneForm>
            <SectiuneForm>
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
                name="confirmareParola"
                type="password"
                validari={verificareForm.confirmareParola}
              />
            </SectiuneForm>
            <SectiuneButoane>
              <ButonCreareCont />
              <ButonLogin />
            </SectiuneButoane>
          </form>
        </div>
      </Paper>
    </div>
  );
}
