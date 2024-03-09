import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Eroare() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Button variant="contained" color="error">
        <Link style={{ color: "white" }} to="/">
          Înapoi
        </Link>
      </Button>
    </div>
  );
}
