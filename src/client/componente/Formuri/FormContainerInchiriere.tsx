import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "../../../interfaces/Interfete_Frontend";
import InputContainer from "../Input/TextField/InputContainer";
import InputCapacitate from "../Input/TextField/InputCapacitate";
import Descriere from "../Input/TextArea/Descriere";
import ButonSubmit from "../Butoane/ButonSubmit";
import SectiuneForm from "../Containere/Sectiuni/SectiuneForm";
import Localitati from "../../pages/InregistrareUtilizator/Componente/Localitati";
import ButonPreturi from "../Butoane/ButonPreturi";
import { verificareFormContainer } from "../../utils/Vaidari_Frontend/Container/validari_container";
import { useNavigate } from "react-router-dom";

const FormContainerInchiriere = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormContainer>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormContainer> = async (data) => {
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/containere/containerInchiriere/new",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspuns.ok) {
        throw new Error(`Eroare HTTP! Status ${raspuns.status}`);
      } else {
        const rutaContainerInchiriereNou = await raspuns.json();
        navigate(
          `/containere/depozitare/${rutaContainerInchiriereNou.id_container}`
        );
      }
    } catch (eroare) {
      console.log(eroare);
    }
  };
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
        <SectiuneForm>
          <ButonPreturi
            register={register}
            errors={errors}
            resetField={resetField}
            validari={verificareFormContainer.pret}
          />
        </SectiuneForm>
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

export default FormContainerInchiriere;
