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
import { InputPoza } from "../InputPoza.js";
import { InterfataNotificare } from "../../../../../componente/Erori/Notificare/Interfete.js";
import React from "react";
import Notificare from "../../../../../componente/Erori/Notificare/Notificare.js";

const FormContainerInchiriere = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormContainer>();

  const navigate = useNavigate();
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const onSubmit: SubmitHandler<FormContainer> = async (data) => {
    const valoarePoza = watch("poza", "");
    if (!valoarePoza) {
      setNotificare({
        open: true,
        mesaj: "Vă rugăm să alegeți o poză",
        tip: "eroare",
      });
      return;
    }
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/containere/containerInchiriere",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspuns.ok) {
        setNotificare({
          open: true,
          mesaj: "Containerul de depozitare nu a putut fi adăugat",
          tip: "succes",
        });
        return;
      } else {
        setNotificare({
          open: true,
          mesaj: "Containerul de depozitare a fost adăugat cu succes",
          tip: "succes",
        });
        const containerNou = await raspuns.json();
        navigate(`/containere/depozitare/${containerNou.id_container}`);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Containerul de depozitare nu a putut fi adăugat",
        tip: "succes",
      });
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
        <section>
          <ButonPreturi
            register={register}
            errors={errors}
            resetField={resetField}
            validari={verificareFormContainer.pret}
          />
        </section>
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
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </section>
  );
};

export default FormContainerInchiriere;
