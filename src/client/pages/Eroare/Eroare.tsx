import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Eroare.css";

export default function Eroare() {
  return (
    <div className="Eroare">
      <h1>404 : Pagina nu a fost găsită!</h1>
      <Button variant="contained" color="error">
        <Link style={{ color: "white" }} to="/">
          Înapoi
        </Link>
      </Button>
    </div>
  );
}
