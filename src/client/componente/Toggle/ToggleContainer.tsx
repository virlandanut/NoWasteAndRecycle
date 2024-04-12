import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

interface ToggleContainer {
  setTipContainer: React.Dispatch<React.SetStateAction<number>>;
}

const ToggleContainer = ({ setTipContainer }: ToggleContainer) => {
  const [toggle, setToggle] = React.useState<number>(0);

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
      exclusive
      onChange={handleChange}>
      <ToggleButton value={0}>Reciclare</ToggleButton>
      <ToggleButton value={1}>Închiriere</ToggleButton>
      <ToggleButton value={2}>Construcții</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleContainer;
