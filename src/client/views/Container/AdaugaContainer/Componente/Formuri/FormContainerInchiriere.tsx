import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "./Interfete.js";
import InputContainer from "../InputContainer.js";
import InputCapacitate from "../InputCapacitate.js";
import Descriere from "../Descriere.js";
import ButonSubmit from "../../../../../componente/Butoane/ButonSubmit.js";
import Localitati from "../../../../../componente/ComboBox/Localitati.js";
import ButonPreturi from "../../../../../componente/Butoane/ButonPreturi.js";
import { useNavigate } from "react-router-dom";
import { verificareFormContainer } from "../../Validari.js";

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
        <section className="flex gap-2">
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
        </section>
        <Localitati
          register={register}
          errors={errors}
          name="localitate"
          validari={verificareFormContainer.localitate}
        />
        <section>
          <ButonPreturi
            register={register}
            errors={errors}
            resetField={resetField}
            validari={verificareFormContainer.pret}
          />
        </section>
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
