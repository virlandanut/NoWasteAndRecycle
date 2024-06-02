import { useState } from "react";
import {
  FormContainer,
  PropsContainer,
} from "../../../server/Interfete/Interfete_Frontend.js";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ButonPreturi: React.FC<PropsContainer> = ({
  register,
  errors,
  resetField,
  validari,
}: PropsContainer) => {
  const [preturiAdaugate, setPreturiAdaugate] = useState<
    (keyof FormContainer)[]
  >(["pretZi", "pretSaptamana", "pretLuna", "pretAn"]);

  const adaugaPret = (pret: keyof FormContainer | undefined) => {
    if (pret && preturiAdaugate.length < 4 && !preturiAdaugate.includes(pret)) {
      setPreturiAdaugate((prev) => [...prev, pret]);
    }
  };

  const stergePret = (pret: keyof FormContainer) => {
    if (resetField && preturiAdaugate.length > 1) {
      resetField(pret, "");
      setPreturiAdaugate((prev) => prev.filter((p) => p !== pret));
    }
  };

  const urmatorulPret = (preturiAdaugate: (keyof FormContainer)[]) => {
    const preturiPosibile: (keyof FormContainer)[] = [
      "pretZi",
      "pretSaptamana",
      "pretLuna",
      "pretAn",
    ];
    return preturiPosibile.find((pret) => !preturiAdaugate.includes(pret));
  };

  const preturiLabel = {
    pretZi: "zi",
    pretSaptamana: "săptămână",
    pretLuna: "lună",
    pretAn: "an",
  } as Record<keyof FormContainer, string>;

  return (
    <section>
      {preturiAdaugate.map((pret: keyof FormContainer, index) => (
        <div key={index} className="w-full flex gap-3 mb-3">
          <TextField
            className="w-full appearance-none"
            InputProps={{
              endAdornment: <InputAdornment position="end">RON</InputAdornment>,
            }}
            {...register(pret, validari)}
            error={!!errors[pret]}
            label={`Preț pe ${preturiLabel[pret]}`}
            color="success"
            type="number"
            variant="outlined"
            size="small"
            name={pret}
            helperText={errors[pret] && errors[pret]?.message}
          />
          {preturiAdaugate.length > 1 && (
            <IconButton color="success" onClick={() => stergePret(pret)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
      {preturiAdaugate.length < 4 && (
        <IconButton
          size="small"
          color="success"
          onClick={() => adaugaPret(urmatorulPret(preturiAdaugate))}>
          <AddIcon />
        </IconButton>
      )}
    </section>
  );
};

export default ButonPreturi;
