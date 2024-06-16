import { TextField } from "@mui/material";
import { PropsSDFirma } from "../Interfete";

const InputSDFirma = ({
  register,
  errors,
  label,
  name,
  type = "text",
  validari,
  valoareDefault,
}: PropsSDFirma) => {
  return (
    <TextField
      defaultValue={valoareDefault}
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

export default InputSDFirma;
