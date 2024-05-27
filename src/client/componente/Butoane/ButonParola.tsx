import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ButonParola() {
  return (
    <Link style={{ textDecoration: "none" }} to={"#"}>
      <Button
        sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        type="button"
        color="inherit"
        size="small">
        Schimbă parola
      </Button>
    </Link>
  );
}
