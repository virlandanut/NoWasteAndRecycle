import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Info from "../Info/Info";
import { useEffect, useState } from "react";
interface PropsButonNavigare {
  ruta: string;
  text: string;
  mesajHover?: string;
  dezactivat?: boolean;
}

export default function ButonNavigare({ ruta, text }: PropsButonNavigare) {
  return (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <Button type="button" color="inherit">
        {text}
      </Button>
    </Link>
  );
}
