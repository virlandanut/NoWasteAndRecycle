import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

interface ToggleContainer {
  setTipContainer: React.Dispatch<React.SetStateAction<number>>;
}

const ToggleContainerPersoana = ({ setTipContainer }: ToggleContainer) => {
  const [toggle, setToggle] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    if (value !== null) {
      setToggle(value);
      setTipContainer(value);
    }
  };

  return (
    <ToggleButtonGroup
      color="success"
      value={toggle}
      defaultValue={toggle}
      exclusive
      onChange={handleChange}>
      <ToggleButton value={1}>Depozitare</ToggleButton>
      <ToggleButton value={2}>Construcții</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleContainerPersoana;
