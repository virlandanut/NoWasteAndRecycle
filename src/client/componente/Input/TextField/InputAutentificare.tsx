import { TextField } from "@mui/material";
import { PropsAutentificare } from "../../../../../interfaces.js";

const InputAutentificare: React.FC<PropsAutentificare> = ({
  register,
  errors,
  label,
  name,
  type = "text",
  stateLogin = false,
  onChange,
  validari,
}) => {
  return (
    <TextField
      className="w-full"
      {...register(name, validari)}
      error={!!errors[name] || stateLogin}
      label={label}
      color="success"
      type={type}
      variant="outlined"
      size="small"
      name={name}
      onChange={onChange}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputAutentificare;
