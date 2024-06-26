import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { PropsFirma } from "../Interfete/Interfete.js";
import { codCAEN } from "../../../../../server/Routes/Caen/Interfete.js";

export default function CAEN({ register, errors, name, validari }: PropsFirma) {
  const [coduri, setCoduri] = useState<codCAEN[]>([]);

  useEffect(() => {
    const getCoduri = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + "/api/Caen/getCoduriCaen"
        );
        if (!raspuns.ok) {
          throw new Error(
            "Eroare la interogarea codurilor CAEN din baza de date!"
          );
        }
        const data = await raspuns.json();
        setCoduri(data);
      } catch (eroare) {
        console.log(eroare);
      }
    };

    getCoduri();
  }, []);

  return (
    <Autocomplete
      className="w-full"
      size="small"
      options={coduri}
      getOptionLabel={(optiune) => String(optiune.cod_caen)}
      renderInput={(params) => (
        <TextField
          {...register(name, validari)}
          error={!!errors.caen}
          color="success"
          name={name}
          {...params}
          label="CAEN *"
          helperText={errors.caen && errors.caen.message}
        />
      )}
    />
  );
}
