import { TextField } from "@mui/material";
import { PropsAutentificare } from "../Interfete.js";
import { verificareAutentificare } from "../Validari/Validari.js";
const InputAutentificare: React.FC<PropsAutentificare> = ({
  register,
  errors,
  label,
  name,
  type = "text",
  stateLogin = false,
  onClick,
  autocomplete,
}) => {
  return (
    <TextField
      className={"w-full"}
      {...register(name, verificareAutentificare[name])}
      error={!!errors[name] || stateLogin}
      label={label}
      color="success"
      type={type}
      variant="outlined"
      size="small"
      name={name}
      onClick={onClick}
      helperText={errors[name] && errors[name]?.message}
      autoComplete={autocomplete}
    />
  );
};

export default InputAutentificare;
