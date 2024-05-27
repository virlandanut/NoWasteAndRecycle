import { Backdrop, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardRaportare from "../Carduri/CardRaportare/CardRaportare";
import React from "react";

export default function ButonRaportare() {
  const [raportare, setRaportare] = useState<boolean>(false);

  const deschideRaport = () => {
    setRaportare(true);
  };

  const inchideRaport = () => {
    setRaportare(false);
  };

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
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          margin: 0,
          padding: 0,
        }}
        open={raportare}
        onClick={inchideRaport}>
        <CardRaportare />
      </Backdrop>
    </React.Fragment>
  );
}
