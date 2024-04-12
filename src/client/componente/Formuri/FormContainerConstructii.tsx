import InputContainer from "../Input/TextField/InputContainer";
import InputCapacitate from "../Input/TextField/InputCapacitate";
import InputPret from "../Input/TextField/InputPret";
import Descriere from "../Input/TextArea/Descriere";
import ButonSubmit from "../Butoane/ButonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "../../../interfaces/Interfete_Frontend";

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
          validari={{}}
        />
        <InputCapacitate
          register={register}
          errors={errors}
          label="Capacitate *"
          name="capacitate"
          validari={{}}
        />
        <InputContainer
          register={register}
          errors={errors}
          label="Adresă *"
          name="adresa"
          validari={{}}
        />

        <InputPret
          register={register}
          errors={errors}
          label="Preț zi *"
          name="pretZi"
          validari={{}}
        />
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

export default FormContainerConstructii;
