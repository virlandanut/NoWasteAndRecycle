import { Autocomplete, TextField } from "@mui/material";
import { codCAEN, PropsFirma } from "../../../../interfaces";
import { useEffect, useState } from "react";

export default function CAEN({ register, errors, name, validari }: PropsFirma ) {
  const [coduri, setCoduri] = useState<codCAEN[]>([]);

  useEffect(() => {
    const getCoduri = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + "/api/getCoduriCaen"
        );
        if (!raspuns.ok) {
          throw new Error(
            "Eroare la interogarea codurilor CAEN din baza de date!"
          );
        }
        const data = await raspuns.json();
        setCoduri(data);
      } catch (eroare: any) {
        console.log(eroare.message);
      }
    };

    getCoduri();
  }, []);

  return (
    <Autocomplete
      className="w-full"
      size="small"
      options={coduri}
      getOptionLabel={(optiune) => String(optiune.codCaen)}
      renderInput={(params) => (
        <TextField
          {...register(name, validari)}
          error={!!errors.caen}
          color="success"
          name={name}
          {...params}
          label="CAEN"
          helperText={errors.caen && errors.caen.message}
        />
      )}
    />
  );
}
