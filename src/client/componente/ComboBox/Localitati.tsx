import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Localitate } from "../../../server/Routes/Localitati/Interfete";

interface LocalitatiProps {
  register: any;
  errors: any;
  name: any;
  validari: any;
  valoareInitiala?: string;
}

export default function Localitati({
  register,
  errors,
  name,
  validari,
  valoareInitiala,
}: LocalitatiProps) {
  const { setValue } = useForm();
  const [localitati, setLocalitati] = useState<Localitate[]>([]);
  const [valoareSelectata, setValoareSelectata] = useState<Localitate | null>(
    null
  );

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
        if (valoareInitiala) {
          const valoareInitialaSelectata = data.find(
            (localitate) => localitate.denumire_localitate === valoareInitiala
          );
          setValoareSelectata(valoareInitialaSelectata);
        }
      } catch (eroare) {
        console.log(eroare);
      }
    };
    getLocalitati();
  }, []);

  const handleChange = (event, newValue) => {
    setValoareSelectata(newValue);
    setValue(name, newValue);
  };

  return (
    <Autocomplete
      value={valoareSelectata}
      onChange={handleChange}
      inputValue={valoareSelectata?.denumire_localitate || ""}
      onInputChange={(event, newValue) => {
        if (!newValue) {
          setValoareSelectata(null);
          setValue(name, null);
        }
      }}
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
