import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ContextUtilizatorCurent } from "../../../../Erori/RutaProtejata";
import React from "react";
import { Utilizator } from "@prisma/client";

export default function ButonRapoarte() {
  const { utilizatorCurent, setUtilizatorCurent } = React.useContext(ContextUtilizatorCurent);

  return (
    utilizatorCurent && <Link style={{ textDecoration: "none" }} to={`/${utilizatorCurent.id_utilizator}/rapoarte`}>
      <Button
        sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        type="button"
        color="inherit">
        {"Tichetele mele"}
      </Button>
    </Link>
  );
}
