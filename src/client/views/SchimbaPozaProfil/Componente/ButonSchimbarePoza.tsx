import { Button } from "@mui/material";
import React from "react";

interface ButonSchimbarePozaProps {
  deschideSchimbarePoza: () => void;
}

export const ButonSchimbarePoza = (props: ButonSchimbarePozaProps) => {
  return (
    <Button
      sx={{
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
      }}
      color="inherit"
      size="small"
      onClick={props.deschideSchimbarePoza}>
      Schimbă poza
    </Button>
  );
};
