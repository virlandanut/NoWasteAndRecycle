import { IconButton } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

interface ButonSchimbareDateContainerProps {
  deschideSchimbareDateContainer: () => void;
}

export const ButonSchimbareDateContainer: React.FC<
  ButonSchimbareDateContainerProps
> = (props) => {
  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={props.deschideSchimbareDateContainer}>
      <EditIcon />
    </IconButton>
  );
};
