import React from "react";
import { FormSDContainer, PropsSDContainerPreturi } from "../Interfete";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { transformaPreturi } from "../Functii";

export const InputSDPreturi: React.FC<PropsSDContainerPreturi> = (props) => {
  const [preturiAdaugate, setPreturiAdaugate] = React.useState<
    (keyof FormSDContainer)[]
  >(["pretZi", "pretSaptamana", "pretLuna", "pretAn"]);
  const [preturiFormatate, setPreturiFormatate] = React.useState<
    Partial<FormSDContainer>
  >(transformaPreturi(props.preturiInitiale));
  console.log(preturiAdaugate);
  console.log(preturiFormatate);

  React.useEffect(() => {
    const preturi = [
      "pretZi",
      "pretSaptamana",
      "pretLuna",
      "pretAn",
    ] as (keyof FormSDContainer)[];
    const preturiValide = preturi.filter(
      (p) => preturiFormatate && preturiFormatate[p] !== undefined
    );
    setPreturiAdaugate(preturiValide);
  }, [props.preturiInitiale]);

  const adaugaPret = () => {
    const preturi = [
      "pretZi",
      "pretSaptamana",
      "pretLuna",
      "pretAn",
    ] as (keyof FormSDContainer)[];
    const urmatorulPret = preturi.find((p) => !preturiAdaugate.includes(p));
    if (urmatorulPret) {
      setPreturiAdaugate([...preturiAdaugate, urmatorulPret]);
    }
  };

  const stergePret = (pret: keyof FormSDContainer) => {
    if (pret === "pretZi") return;
    setPreturiAdaugate(preturiAdaugate.filter((p) => p !== pret));
    const preturiFormatateCopie = { ...preturiFormatate };
    delete preturiFormatateCopie[pret];
    setPreturiFormatate(preturiFormatateCopie);
    props.resetField(pret);
  };

  const preturiLabel = {
    pretZi: "zi",
    pretSaptamana: "săptămână",
    pretLuna: "lună",
    pretAn: "an",
  };
  return (
    <section>
      {preturiAdaugate.map((pret, index) => (
        <div
          key={pret}
          className={`w-full flex gap-3 ${index === preturiAdaugate.length - 1 ? "" : "mb-3"}`}>
          <TextField
            className="w-full appearance-none"
            InputProps={{
              endAdornment: <InputAdornment position="end">RON</InputAdornment>,
            }}
            {...props.register(pret, props.validari)}
            error={!!props.errors[pret]}
            label={`Preț pe ${preturiLabel[pret]}`}
            color="success"
            type="number"
            variant="outlined"
            size="small"
            name={pret}
            defaultValue={preturiFormatate[pret]}
            helperText={props.errors[pret]?.message}
          />
          {index === preturiAdaugate.length - 1 && pret !== "pretZi" && (
            <IconButton color="success" onClick={() => stergePret(pret)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
      {preturiAdaugate.length < 4 && (
        <IconButton size="small" color="success" onClick={adaugaPret}>
          <AddIcon />
        </IconButton>
      )}
    </section>
  );
};
