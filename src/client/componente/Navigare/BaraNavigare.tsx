import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack, Typography } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare";
import ButonLogout from "../Butoane/ButonLogout";
import { useEffect, useState } from "react";

const BaraNavigare = () => {
  const [esteFirma, setEsteFirma] = useState<boolean>(false);
  const [esteAprobata, setEsteAprobata] = useState<boolean>(false);

  useEffect(() => {
    async function verificareFirma() {
      try {
        const raspunsEsteFirma = await fetch(
          "http://localhost:3000/api/utilizatori/rol"
        );
        const statusEsteFirma = await raspunsEsteFirma.json();
        setEsteFirma(statusEsteFirma.success);
        if (statusEsteFirma.success) {
          const raspunsEsteAprobat = await fetch(
            "http://localhost:3000/api/utilizatori/aprobare"
          );
          const statusAprobare = await raspunsEsteAprobat.json();
          setEsteAprobata(statusAprobare.success);
        }
      } catch (eroare) {
        console.log(eroare);
      }
    }
    verificareFirma();
  }, []);

  return (
    <AppBar sx={{ m: 0, boxShadow: 0, bgcolor: "#97AA6D" }} position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div"></Typography>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <ButonNavigare ruta="/" text="Acasă" />
          <ButonNavigare ruta="/navigare" text="Navigare" />
          <ButonNavigare ruta="/containere" text="Containere" />
          {esteFirma && (
            <ButonNavigare
              ruta="/containere/adauga"
              text="Adaugă container"
              dezactivat={!esteAprobata}
            />
          )}
        </Stack>
        <Stack direction="row" spacing={2}>
          <ButonNavigare ruta="/profil" text="Profil" />
          <ButonLogout />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BaraNavigare;
