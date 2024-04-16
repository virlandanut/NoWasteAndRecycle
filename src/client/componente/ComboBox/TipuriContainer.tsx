import { Autocomplete, TextField } from "@mui/material";
import { FormContainer } from "../../../interfaces/Interfete_Frontend.js";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { TipContainer } from "../../../interfaces/Interfete_Container.js";
import Loading from "../../pages/Loading.js";

interface TipContainerProps {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name: keyof FormContainer;
  type?: string;
  validari: object;
}

const TipuriContainer = ({
  register,
  errors,
  name,
  validari,
}: TipContainerProps) => {
  const [tipuriContainer, setTipuriContainer] = useState<TipContainer[]>([]);

  useEffect(() => {
    const getTipuriContainer = async () => {
      try {
        const raspuns = await fetch(process.env.API_BASE + "/api/tipuri");
        if (!raspuns.ok) {
          throw new Error(
            "Eroare la interogarea tipurilor de container de la server!"
          );
        }
        const data = await raspuns.json();
        setTipuriContainer(data);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    getTipuriContainer();
  }, []);

  return (
    <Autocomplete
      className="w-full"
      size="small"
      options={tipuriContainer}
      getOptionLabel={(optiune) => optiune.denumire_tip}
      renderInput={(params) => (
        <TextField
          {...register(name, validari)}
          error={!!errors.tip}
          color="success"
          name={name}
          {...params}
          label="Tip deșeu *"
          helperText={errors.tip && errors.tip.message}
        />
      )}
    />
  );
};

export default TipuriContainer;
