import InputContainer from "../InputContainer.js";
import InputCapacitate from "../InputCapacitate.js";
import InputPret from "../InputPret.js";
import Descriere from "../Descriere.js";
import ButonSubmit from "../../../../../componente/Butoane/ButonSubmit.js";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "./Interfete.js";
import { useNavigate } from "react-router-dom";
import { verificareFormContainer } from "../../Validari.js";
import Localitati from "../../../../../componente/ComboBox/Localitati.js";
import { InputPoza } from "../InputPoza.js";
import { InterfataNotificare } from "../../../../../componente/Erori/Notificare/Interfete.js";
import React from "react";

const FormContainerConstructii = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormContainer>();
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormContainer> = async (data) => {
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/containere/containerMaterialeConstructii",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspuns.ok) {
        throw new Error(`Eroare HTTP! Status ${raspuns.status}`);
      } else {
        const rutaContainerMaterialeConstructii = await raspuns.json();
        setNotificare({
          open: true,
          mesaj: rutaContainerMaterialeConstructii.mesaj,
          tip: "succes",
        });
        setTimeout(() => {
          navigate(
            `/containere/constructii/${rutaContainerMaterialeConstructii.id_container}`
          );
        }, 1000);
      }
    } catch (eroare) {
      console.log(eroare);
    }
  };

  return (
    <section className="w-full flex justify-end gap-10">
      <img className="w-1/2" src="/containerConstructii.svg" alt="" />
      <form
        className="w-1/2 flex flex-col justify-start gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <section className="flex gap-2">
          <div className="w-1/2">
            <Localitati
              register={register}
              errors={errors}
              name="localitate"
              validari={verificareFormContainer.localitate}
            />
          </div>
          <div className="w-1/2">
            <InputContainer
              register={register}
              errors={errors}
              label="Cod poștal *"
              name="codPostal"
              validari={verificareFormContainer.codPostal}
            />
          </div>
        </section>
        <InputPret
          register={register}
          errors={errors}
          label="Preț zi *"
          name="pretZi"
          validari={verificareFormContainer.pret}
        />
        <InputPoza setValue={setValue} setNotificare={setNotificare} />
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
