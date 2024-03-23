import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Eroare() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl">
        <span className="text-red-500 font-bold">Eroare 404</span>: Pagina nu a
        fost găsită!
      </h1>
      <Link style={{ color: "white" }} to="/">
        <Button variant="contained" color="error">
          Înapoi
        </Button>
      </Link>
    </div>
  );
}
