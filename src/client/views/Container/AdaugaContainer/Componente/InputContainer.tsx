import { TextField } from "@mui/material";
import { FormContainer } from "./Formuri/Interfete.js";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputContainer {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name: keyof FormContainer;
  validari: object;
}

const InputContainer: React.FC<InputContainer> = ({
  register,
  errors,
  label,
  name,
  validari,
}) => {
  return (
    <TextField
      className="w-full"
      {...register(name, validari)}
      error={!!errors[name]}
      label={label}
      color="success"
      type="text"
      variant="outlined"
      size="small"
      name={name}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputContainer;
