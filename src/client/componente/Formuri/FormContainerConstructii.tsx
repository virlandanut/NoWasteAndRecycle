import InputContainer from "../Input/TextField/InputContainer";
import InputCapacitate from "../Input/TextField/InputCapacitate";
import InputPret from "../Input/TextField/InputPret";
import Descriere from "../Input/TextArea/Descriere";
import ButonSubmit from "../Butoane/ButonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "../../../interfaces/Interfete_Frontend";
import Localitati from "../ComboBox/Localitati";
import SectiuneForm from "../Containere/Sectiuni/SectiuneForm";
import { verificareFormContainer } from "../../utils/Vaidari_Frontend/Container/validari_container";
import { useEffect } from "react";

const FormContainerConstructii = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormContainer>();

  const onSubmit: SubmitHandler<FormContainer> = () => console.log("Hello!");
  return (
    <section className="w-full flex justify-end gap-10">
      <img className="w-1/2" src="/containerConstructii.svg" alt="" />
      <form
        className="w-1/2 flex flex-col justify-start gap-3"
        onSubmit={handleSubmit(onSubmit)}>
        <InputContainer
          register={register}
          errors={errors}
          label="Denumire *"
          name="denumire"
          validari={verificareFormContainer.denumire}
        />
        <InputCapacitate
          register={register}
          errors={errors}
          label="Capacitate *"
          name="capacitate"
          validari={verificareFormContainer.capacitate}
        />
        <SectiuneForm tailwind="flex gap-2">
          <InputContainer
            register={register}
            errors={errors}
            label="Strada *"
            name="strada"
            validari={verificareFormContainer.strada}
          />
          <InputContainer
            register={register}
            errors={errors}
            label="Număr *"
            name="numar"
            validari={verificareFormContainer.numar}
          />
        </SectiuneForm>
        <Localitati
          register={register}
          errors={errors}
          name="localitate"
          validari={verificareFormContainer.localitate}
        />
        <InputPret
          register={register}
          errors={errors}
          label="Preț zi *"
          name="pretZi"
          validari={verificareFormContainer.pret}
        />
        <Descriere
          register={register}
          errors={errors}
          label="Descriere *"
          name="descriere"
          validari={verificareFormContainer.descriere}
        />
        <ButonSubmit text="Adaugă container" />
      </form>
    </section>
  );
};

export default FormContainerConstructii;
