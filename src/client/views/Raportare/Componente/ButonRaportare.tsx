import { Button } from "@mui/material";
import React from "react";

interface ButonRaportareProps {
  deschideRaport: () => void;
}

export default function ButonRaportare({
  deschideRaport,
}: ButonRaportareProps) {
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
        onClick={deschideRaport}>
        Tichet problemă
      </Button>
    </React.Fragment>
  );
}
