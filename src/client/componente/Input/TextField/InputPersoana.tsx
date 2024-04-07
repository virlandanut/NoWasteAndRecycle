import { TextField } from "@mui/material";
import { PropsPersoana } from "../../../../interfaces/Interfete_Frontend.js";

const InputText: React.FC<PropsPersoana> = ({
  register,
  errors,
  label,
  name,
  type = "text",
  validari,
}) => {
  return (
    <TextField
      className="w-full"
      {...register(name, validari)}
      error={!!errors[name]}
      label={label}
      color="success"
      type={type}
      variant="outlined"
      size="small"
      name={name}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputText;
