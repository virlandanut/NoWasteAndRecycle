import { TextField } from "@mui/material";
import React from "react";
import { PropsContainer } from "./Formuri/Interfete.js";

const Descriere: React.FC<PropsContainer> = ({
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
      helperText={errors[name!] && errors[name!]?.message}
    />
  );
};

export default Descriere;
