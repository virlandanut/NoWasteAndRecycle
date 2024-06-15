import { PropsSDPersoana } from "../Interfete";
import { TextField } from "@mui/material";

const InputSDPersoana = ({
  register,
  errors,
  label,
  name,
  type = "text",
  validari,
  valoareDefault,
}: PropsSDPersoana) => {
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

export default InputSDPersoana;
