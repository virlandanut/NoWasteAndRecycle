import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
interface PropsButonNavigare {
  ruta: string;
  text: string;
  mesajHover?: string;
  dezactivat?: boolean;
}

export default function ButonNavigare({ ruta, text }: PropsButonNavigare) {
  return (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <Button
        sx={{
          color: "#15803d",
          fontWeight: "bold",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "#15803d",
            color: "#ffffff",
          },
        }}
        type="button"
        color="inherit">
        {text}
      </Button>
    </Link>
  );
}
