import { TextField } from "@mui/material";
import React from "react";
import { PropsRaportare } from "../Interfete";

const Mesaj: React.FC<PropsRaportare> = ({
  register,
  errors,
  label,
  name,
  type = "text",
  validari,
}) => {
  return (
    <TextField
      className="w-full h-full"
      {...register(name, validari)}
      error={!!errors[name]}
      label={label}
      color="success"
      type={type}
      multiline={true}
      minRows={12}
      maxRows={20}
      variant="outlined"
      size="small"
      name={name}
      placeholder="Vă rugăm să vă descrieți experiența"
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default Mesaj;
