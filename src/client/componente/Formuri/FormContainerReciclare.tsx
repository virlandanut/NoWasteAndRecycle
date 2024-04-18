import { SubmitHandler, useForm } from "react-hook-form";
import InputContainer from "../Input/TextField/InputContainer";
import InputCapacitate from "../Input/TextField/InputCapacitate";
import Descriere from "../Input/TextArea/Descriere";
import ButonSubmit from "../Butoane/ButonSubmit";
import TipContainer from "../ComboBox/TipuriContainer";
import { FormContainer } from "../../../interfaces/Interfete_Frontend";
import SectiuneForm from "../Containere/Sectiuni/SectiuneForm";
import Localitati from "../ComboBox/Localitati";
import { verificareFormContainer } from "../../utils/Vaidari_Frontend/Container/validari_container";
import ButonPreturi from "../Butoane/ButonPreturi";
import { useNavigate } from "react-router-dom";

const FormContainerReciclare = () => {
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
        process.env.API_BASE + "/api/containere/containerReciclare/new",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspuns.ok) {
        throw new Error(`Eroare HTTP! Status ${raspuns.status}`);
      } else {
        const rutaContainerReciclareNou = await raspuns.json();
        navigate(`/containere/${rutaContainerReciclareNou.id_container}`);
      }
    } catch (eroare) {
      console.log(eroare);
    }
  };

  return (
    <section className="w-full flex justify-end gap-10">
      <img className="w-1/2" src="/containerReciclare.svg" />
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
        <TipContainer
          register={register}
          name="tip"
          errors={errors}
          validari={verificareFormContainer.tip}
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
        <ButonPreturi
          register={register}
          errors={errors}
          resetField={resetField}
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

export default FormContainerReciclare;
