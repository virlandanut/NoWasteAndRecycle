import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

interface ToggleFormNavigare {
  toggle: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
  setToggle: (value: "RECICLARE" | "DEPOZITARE" | "MATERIALE") => void;
}

const ToggleFormNavigare = (props: ToggleFormNavigare) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: "RECICLARE" | "DEPOZITARE" | "MATERIALE"
  ) => {
    props.setToggle(value);
  };
  return (
    <ToggleButtonGroup
      color="success"
      value={props.toggle}
      exclusive
      onChange={handleChange}>
      <ToggleButton value={"RECICLARE"}>Reciclare</ToggleButton>
      <ToggleButton value={"DEPOZITARE"}>Depozitare</ToggleButton>
      <ToggleButton value={"MATERIALE"}>Materiale</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleFormNavigare;
