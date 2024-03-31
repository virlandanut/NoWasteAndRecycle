import React, { useEffect, useState } from "react";
import { PretContainer } from "../../../../interfaces";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type ListaPreturiProps = {
  container: string;
};

const Preturi = ({ container }: ListaPreturiProps) => {
  const [preturi, setPreturi] = useState<PretContainer[]>([]);
  const [alegerePret, setAlegerePret] = useState("");
  useEffect(() => {
    const fetchPreturi = async () => {
      try {
        const raspunsPreturi = await fetch(
          process.env.API_BASE + `/api/containere/${container}/preturi`
        );
        if (!raspunsPreturi.ok) {
          throw new Error("Preturile nu au fost trimise de către server");
        }
        const dataPreturi = await raspunsPreturi.json();
        setPreturi(dataPreturi);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    fetchPreturi();
  }, [container]);

  const handleChange = (e: SelectChangeEvent) => {
    setAlegerePret(e.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color="success">
          Alege modul de închiriere
        </InputLabel>
        <Select
          value={alegerePret}
          label="Alege modul de închiriere"
          color="success"
          size="medium"
          onChange={handleChange}>
          {preturi.map((pret) => (
            <MenuItem
              key={pret.denumire_tip_pret}
              value={
                pret.pret
              }>{`${pret.pret} RON/${pret.denumire_tip_pret}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Preturi;
