import { useEffect, useState } from "react";
import { Localitate } from "../../../interfaces/Interfete_Localitate";
import { Autocomplete, TextField } from "@mui/material";

export default function Localitati({ register, errors, name, validari }: any) {
  const [localitati, setLocalitati] = useState<Localitate[]>([]);

  useEffect(() => {
    const getLocalitati = async () => {
      try {
        const raspuns = await fetch(process.env.API_BASE + "/api/localitati");
        if (!raspuns.ok) {
          throw new Error(
            "Eroare la interogarea localitatilor din baza de date!"
          );
        }
        const data = await raspuns.json();
        setLocalitati(data);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    getLocalitati();
  }, []);

  return (
    <Autocomplete
      className="w-full"
      size="small"
      options={localitati}
      getOptionLabel={(optiune) => optiune.denumire_localitate}
      renderInput={(params) => (
        <TextField
          {...register(name, validari)}
          error={!!errors.localitate}
          color="success"
          name={name}
          {...params}
          label="Localitate *"
          helperText={errors.localitate && errors.localitate.message}
        />
      )}
    />
  );
}
