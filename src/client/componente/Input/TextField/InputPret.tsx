import { InputAdornment, TextField } from "@mui/material";
import { FormContainer } from "../../../../interfaces/Interfete_Frontend";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PropsPretContainer {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name: keyof FormContainer;
  validari: object;
}

const InputPret: React.FC<PropsPretContainer> = ({
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
        endAdornment: <InputAdornment position="end">{`RON`}</InputAdornment>,
      }}
      {...register(name, validari)}
      error={!!errors[name]}
      label={label}
      color="success"
      type="number"
      variant="outlined"
      size="small"
      name={name}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputPret;
