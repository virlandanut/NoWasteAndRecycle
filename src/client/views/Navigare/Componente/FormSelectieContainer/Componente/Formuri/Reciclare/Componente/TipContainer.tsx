import { Autocomplete, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormSelectieReciclare } from "../Interfete";
import { TipContainer } from "../../../../../../../../../server/Routes/Container/Interfete";
import { verificareFormSelectieReciclare } from "./Validari";

interface TipContainerProps {
  register: UseFormRegister<FormSelectieReciclare>;
  errors: FieldErrors<FormSelectieReciclare>;
  label?: string;
  name: keyof FormSelectieReciclare;
  type?: string;
}

const TipContainerSelectie = ({
  register,
  errors,
  name,
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
      isOptionEqualToValue={(option, value) => option.id_tip === value.id_tip}
      renderInput={(params) => (
        <TextField
          {...register(name, verificareFormSelectieReciclare.tip)}
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

export default TipContainerSelectie;
