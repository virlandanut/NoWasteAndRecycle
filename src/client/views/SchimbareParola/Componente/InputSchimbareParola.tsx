import { TextField } from "@mui/material";
import { FieldValues, RegisterOptions } from "react-hook-form";
import { FormSchimbareParola, FormSchimbareParolaProps } from "../Interfete.js";

const verificareFormSchimbareParola: Record<
  keyof FormSchimbareParola,
  RegisterOptions
> = {
  parolaVeche: {
    required: "Parola veche este obligatorie",
  },
  parolaNoua: {
    required: "Parola nouă este obligatorie",
    validate: {
      verificareParolaNouaVeche: (value: string, values: FieldValues) => {
        if (value === values.parolaVeche) {
          return "Parola trebuie să fie diferită de cea veche";
        }
        if (value.toLowerCase() === value) {
          return "Minim o literă mare";
        }
        if (!/[0-9]/.test(value)) {
          return "Minim o cifră";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return "Minim un caracter special";
        }
      },
    },
    minLength: { value: 10, message: "Minim 10 caractere" },
  },
  parolaNouaRepetata: {
    required: "Repetarea este obligatorie",
    validate: {
      verificareParoleNoi: (value: string, values: FieldValues) => {
        if (value.length !== values.parolaNoua && value !== values.parolaNoua) {
          return "Parolele nu coincid";
        }
      },
    },
  },
};

const InputSchimbareParola: React.FC<FormSchimbareParolaProps> = ({
  register,
  errors,
  label,
  name,
  autocomplete,
}) => {
  return (
    <TextField
      autoComplete={autocomplete}
      className={"w-full"}
      {...register(name, verificareFormSchimbareParola[name])}
      error={!!errors[name]}
      label={label}
      color="success"
      type="password"
      variant="outlined"
      size="small"
      name={name}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputSchimbareParola;
