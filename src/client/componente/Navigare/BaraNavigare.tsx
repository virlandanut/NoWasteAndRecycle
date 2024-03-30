import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack, Typography } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare";
import ButonLogout from "../Butoane/ButonLogout";
import { useEffect, useState } from "react";

const BaraNavigare = () => {
  const [esteFirma, setEsteFirma] = useState<boolean>(false);
  useEffect(() => {
    async function verificareRolFirma() {
      try {
        const respuns = await fetch(
          "http://localhost:3000/api/utilizatori/rol"
        );
        const data = await respuns.json();
        setEsteFirma(data.success);
      } catch (eroare) {
        console.log(eroare);
      }
    }
    verificareRolFirma();
  }, []);
  return (
    <AppBar sx={{ m: 0, boxShadow: 0 }} position="sticky" color="success">
      <Toolbar>
        <Typography variant="h6" component="div"></Typography>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <ButonNavigare ruta="/" text="Acasă" />
          <ButonNavigare ruta="/navigare" text="Navigare" />
          <ButonNavigare ruta="/containere" text="Containere" />
          {esteFirma && (
            <ButonNavigare ruta="/containere/adauga" text="Adaugă container" />
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
