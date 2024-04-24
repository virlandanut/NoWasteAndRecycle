import { TextField } from "@mui/material";
import { PropsContainer } from "../../../../interfaces/Interfete_Frontend";

const InputContainer: React.FC<PropsContainer> = ({
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