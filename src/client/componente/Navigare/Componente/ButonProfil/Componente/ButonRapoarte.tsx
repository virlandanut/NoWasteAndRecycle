import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ButonRapoarte() {
  const [idUtilizator, setIdUtilizator] = useState<number>();

  useEffect(() => {
    const getUtilizatorCurent = async () => {
      try {
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getIdUtilizatorCurent"
        );
        if (!raspunsUtilizator.ok) {
          console.log("Utilizatorul nu a putut fi obținut de la server!");
        }
        const dateUtilizator = await raspunsUtilizator.json();
        setIdUtilizator(dateUtilizator.id);
      } catch (eroare) {
        console.log(
          "Au existat probleme la obținerea utilizatorului: ",
          eroare
        );
      }
    };
    getUtilizatorCurent();
  }, []);
  return (
    <Link style={{ textDecoration: "none" }} to={`/${idUtilizator}/rapoarte`}>
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
