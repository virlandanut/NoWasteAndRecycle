import { SubmitHandler, useForm } from "react-hook-form";
import InputContainer from "../../InputContainer.js";
import InputCapacitate from "../../InputCapacitate.js";
import Descriere from "../../Descriere.js";
import ButonSubmit from "../../../../../../componente/Butoane/ButonSubmit.js";
import TipuriContainer from "./TipuriContainer.js";
import { FormContainer } from "../Interfete.js";
import Localitati from "../../../../../../componente/ComboBox/Localitati.js";
import { verificareFormContainer } from "../../../Validari.js";
import ButonPreturi from "../../../../../../componente/Butoane/ButonPreturi.js";
import { useNavigate } from "react-router-dom";
import { InputPoza } from "../../InputPoza.js";
import { InterfataNotificare } from "../../../../../../componente/Erori/Notificare/Interfete.js";
import React from "react";
import Notificare from "../../../../../../componente/Erori/Notificare/Notificare.js";

const FormContainerReciclare = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<FormContainer>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormContainer> = async (data) => {
    setLoading(true);
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/containere/containerReciclare",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        setNotificare({ open: true, mesaj: eroare.mesaj, tip: "eroare" });
      } else {
        const rutaContainerReciclareNou = await raspuns.json();
        setNotificare({
          open: true,
          mesaj: rutaContainerReciclareNou.mesaj,
          tip: "succes",
        });
        setTimeout(() => {
          setLoading(false);
          navigate(
            `/containere/reciclare/${rutaContainerReciclareNou.id_container}`
          );
        }, 1000);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: (eroare as Error).message,
        tip: "succes",
      });
    }
  };

  return (
    <section className="w-full flex justify-end gap-10">
      <img className="w-1/2" src="/containerReciclare.svg" />
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
        <TipuriContainer
          register={register}
          name="tip"
          errors={errors}
          validari={verificareFormContainer.tip}
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
        <ButonPreturi
          register={register}
          errors={errors}
          resetField={resetField}
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
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </section>
  );
};

export default FormContainerReciclare;
