import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Eroare {
  codEroare?: number;
  mesaj?: string;
}

export default function Eroare({
  codEroare = 404,
  mesaj = "Pagina nu a fost găsită!",
}: Eroare) {
  return (
    <div className=" h-[50vh] flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl">
        <span className="text-red-500 font-bold">Eroare {codEroare}</span>:{" "}
        {mesaj}
      </h1>
      <Link style={{ color: "white" }} to="/">
        <Button variant="contained" color="error">
          Înapoi
        </Button>
      </Link>
    </div>
  );
}
