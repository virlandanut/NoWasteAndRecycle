import { TextField } from "@mui/material";
import { PropsFirma } from "../../../../../interfaces.js";
import { FormFirma, FormPersoana } from "../../../types.js";

const InputText: React.FC<PropsFirma> = ({
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

export default InputText;
