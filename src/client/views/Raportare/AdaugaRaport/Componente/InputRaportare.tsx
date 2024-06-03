import { TextField } from "@mui/material";
import { PropsRaportare } from "../Interfete.js";

const InputRaportare: React.FC<PropsRaportare> = ({
  register,
  errors,
  label,
  name,
  type = "text",
  validari,
}) => {
  return (
    <TextField
      className={"w-full"}
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

export default InputRaportare;
