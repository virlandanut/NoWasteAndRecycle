import { InputAdornment, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormContainer } from "./Formuri/Interfete.js";

interface InputCapacitate {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name: keyof FormContainer;
  validari: object;
}

const InputCapacitate: React.FC<InputCapacitate> = ({
  register,
  errors,
  label,
  name,
  validari,
}) => {
  return (
    <TextField
      className="w-full appearance-none"
      InputProps={{
        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
      }}
      {...register(name, validari)}
      error={!!errors[name]}
      label={label}
      color="success"
      type="string"
      variant="outlined"
      size="small"
      name={name}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputCapacitate;
