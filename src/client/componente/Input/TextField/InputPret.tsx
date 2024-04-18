import { InputAdornment, TextField } from "@mui/material";
import { FormContainer } from "../../../../interfaces/Interfete_Frontend";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PropsPretContainer {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name: keyof FormContainer;
  validari: object;
  valoare?: string;
  onChange?: (value: string) => void;
}

const InputPret: React.FC<PropsPretContainer> = ({
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
    onChange && onChange(newValue); // Ensure onChange is defined before calling it
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
      onChange={handleChange} // Pass the handleChange function to onChange prop
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputPret;
