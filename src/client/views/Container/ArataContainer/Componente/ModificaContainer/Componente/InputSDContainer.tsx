import React from "react";
import { PropsSDContainer } from "../Interfete";
import { TextField } from "@mui/material";

export const InputSDContainer: React.FC<PropsSDContainer> = (props) => {
  return (
    <TextField
      defaultValue={props.valoareDefault}
      className="w-full"
      {...props.register(props.name, props.validari)}
      error={!!props.errors[props.name]}
      label={props.label}
      color="success"
      type={props.type}
      variant="outlined"
      size="small"
      rows={props.rows ? props.rows : 1}
      name={props.name}
      multiline={props.rows ? true : false}
      helperText={props.errors[props.name] && props.errors[props.name]?.message}
    />
  );
};
