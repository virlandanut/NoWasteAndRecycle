import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSelectieReciclare } from "../Interfete";
import { InputAdornment, OutlinedInput, TextField } from "@mui/material";

interface InputSelectie {
  register: UseFormRegister<FormSelectieReciclare>;
  errors: FieldErrors<FormSelectieReciclare>;
  label?: string;
  name: keyof FormSelectieReciclare;
  disabled?: boolean;
  validare: object;
}

const InputSelectie: React.FC<InputSelectie> = ({
  register,
  errors,
  label,
  name,
  disabled = false,
  validare,
}) => {
  return (
    <TextField
      disabled={disabled}
      className="w-full"
      {...register(name, validare)}
      error={!!errors[name]}
      label={label}
      color="success"
      variant="outlined"
      size="small"
      name={name}
      helperText={errors[name] && errors[name]?.message}
    />
  );
};

export default InputSelectie;
