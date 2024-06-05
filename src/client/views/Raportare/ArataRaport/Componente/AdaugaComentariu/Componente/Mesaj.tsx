import { TextField } from "@mui/material";
import React from "react";
import { PropsComentariu } from "../Interfete";

const Mesaj: React.FC<PropsComentariu> = ({
  register,
  errors,
  label,
  name,
  type = "text",
  validari,
  placeholder,
}) => {
  return (
    <TextField
      className="w-full"
      {...register(name!, validari)}
      error={!!errors[name!]}
      label={label}
      color="success"
      type={type}
      multiline={true}
      minRows={5}
      maxRows={10}
      variant="outlined"
      size="small"
      name={name}
      placeholder={placeholder}
      helperText={errors[name!] && errors[name!]?.message}
    />
  );
};

export default Mesaj;
