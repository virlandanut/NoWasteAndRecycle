import { InputAdornment, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormContainer } from "./Formuri/Interfete.js";

interface InputPret {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name: keyof FormContainer;
  validari: object;
  valoare?: string;
  onChange?: (value: string) => void;
}

const InputPret: React.FC<InputPret> = ({
  register,
  errors,
  label,
  name,
  validari,
  valoare,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange && onChange(newValue);
  };

  return (
    <TextField
      className="w-full appearance-none"
      InputProps={{
        endAdornment: <InputAdornment position="end">RON</InputAdornment>,
      }}
      {...register(name, validari)}
      error={!!errors[name]}
      label={label}
      color="success"
      type="number"
      variant="outlined"
      size="small"
      name={name}
      value={valoare}
      onChange={handleChange}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputPret;
