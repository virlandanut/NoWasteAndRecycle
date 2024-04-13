import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "../../../interfaces/Interfete_Frontend";
import InputContainer from "../Input/TextField/InputContainer";
import InputCapacitate from "../Input/TextField/InputCapacitate";
import InputPret from "../Input/TextField/InputPret";
import Descriere from "../Input/TextArea/Descriere";
import ButonSubmit from "../Butoane/ButonSubmit";
import SectiuneForm from "../Containere/Sectiuni/SectiuneForm";
import Localitati from "../ComboBox/Localitati";

const FormContainerInchiriere = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormContainer>();
  const onSubmit: SubmitHandler<FormContainer> = () => console.log("Hello!");
  return (
    <section className="w-full flex justify-center gap-10">
      <img className="w-1/2" src="/containerInchiriere.svg" alt="" />
      <form
        className="w-1/2 flex flex-col justify-start gap-3"
        onSubmit={handleSubmit(onSubmit)}>
        <InputContainer
          register={register}
          errors={errors}
          label="Denumire *"
          name="denumire"
          validari={{}}
        />
        <InputCapacitate
          register={register}
          errors={errors}
          label="Capacitate *"
          name="capacitate"
          validari={{}}
        />
        <SectiuneForm tailwind="flex gap-2">
          <InputContainer
            register={register}
            errors={errors}
            label="Strada *"
            name="strada"
            validari={{}}
          />
          <InputContainer
            register={register}
            errors={errors}
            label="Număr *"
            name="numar"
            validari={{}}
          />
        </SectiuneForm>
        <Localitati
          register={register}
          errors={errors}
          name="localitate"
          validari={{}}
        />
        <SectiuneForm tailwind="flex gap-2">
          <InputPret
            register={register}
            errors={errors}
            label="Preț zi *"
            name="pretZi"
            validari={{}}
          />
          <InputPret
            register={register}
            errors={errors}
            label="Preț săptămână *"
            name="pretSaptamana"
            validari={{}}
          />
        </SectiuneForm>
        <SectiuneForm tailwind="flex gap-2">
          <InputPret
            register={register}
            errors={errors}
            label="Preț lună *"
            name="pretLuna"
            validari={{}}
          />
          <InputPret
            register={register}
            errors={errors}
            label="Preț an *"
            name="pretAn"
            validari={{}}
          />
        </SectiuneForm>
        <Descriere
          register={register}
          errors={errors}
          label="Descriere *"
          name="descriere"
          validari={{}}
        />
        <ButonSubmit text="Adaugă container" />
      </form>
    </section>
  );
};

export default FormContainerInchiriere;
