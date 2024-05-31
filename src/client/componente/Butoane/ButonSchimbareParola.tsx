import { Button } from "@mui/material";
import React from "react";

interface ButonSchimbareParolaProps {
  deschideSchimbareParola: () => void;
}

export default function ButonSchimbareParola({
  deschideSchimbareParola,
}: ButonSchimbareParolaProps) {
  return (
    <React.Fragment>
      <Button
        sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        color="inherit"
        size="small"
        onClick={deschideSchimbareParola}>
        Schimbă parolă
      </Button>
    </React.Fragment>
  );
}
