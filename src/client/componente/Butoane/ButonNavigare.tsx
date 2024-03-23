import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface PropsButonNavigare {
  ruta: string;
  text: string;
}

export default function ButonNavigare({ ruta, text }: PropsButonNavigare) {
  return (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <Button color="inherit">{text}</Button>
    </Link>
  );
}
