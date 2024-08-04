import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PropsButonNavigare } from "./Interfete";

export default function ButonNavigare({
  ruta,
  text,
  culoare = "#15803d",
  culoareTextHover = "#ffffff",
}: PropsButonNavigare) {
  return (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <Button
        sx={{
          color: culoare,
          fontWeight: "bold",
          "&.MuiButtonBase-root:hover": {
            bgcolor: culoare,
            color: culoareTextHover,
          },
        }}
        type="button"
        color="inherit">
        {text}
      </Button>
    </Link>
  );
}
