import { useState } from "react";
import {
  FormContainer,
  PropsContainer,
} from "../../../interfaces/Interfete_Frontend";
import InputPret from "../Input/TextField/InputPret";
import { verificareFormContainer } from "../../utils/Vaidari_Frontend/Container/validari_container";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ButonPreturi = ({ register, errors }: PropsContainer) => {
  const [preturiAdaugate, setPreturiAdaugate] = useState<
    (keyof FormContainer)[]
  >(["pretZi", "pretSaptamana", "pretLuna", "pretAn"]);

  const [inputValues, setInputValues] = useState<Record<string, string>>({
    pretZi: "",
    pretSaptamana: "",
    pretLuna: "",
    pretAn: "",
  });

  const adaugaPret = (pret: keyof FormContainer | undefined) => {
    if (pret && preturiAdaugate.length < 4 && !preturiAdaugate.includes(pret)) {
      setPreturiAdaugate((prev) => [...prev, pret]);
    }
  };

  const stergePret = (pret: keyof FormContainer) => {
    if (preturiAdaugate.length > 1) {
      const updatedValues = { ...inputValues };
      updatedValues[pret] = ""; // Resetting the value
      setInputValues(updatedValues);
      setPreturiAdaugate((prev) => prev.filter((p) => p !== pret));
    }
  };

  return (
    <section>
      {preturiAdaugate.map((pret, index) => (
        <div key={index} className="w-full flex gap-3 mb-3">
          <InputPret
            key={pret}
            register={register}
            errors={errors}
            label={`Preț pe ${pret.slice(4).toLowerCase()}`}
            name={pret}
            valoare={inputValues[pret]}
            validari={verificareFormContainer.pret}
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

const urmatorulPret = (preturiAdaugate: (keyof FormContainer)[]) => {
  const preturiPosibile: (keyof FormContainer)[] = [
    "pretZi",
    "pretSaptamana",
    "pretLuna",
    "pretAn",
  ];
  return preturiPosibile.find((pret) => !preturiAdaugate.includes(pret));
};

export default ButonPreturi;
