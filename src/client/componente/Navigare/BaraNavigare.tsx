import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack, Typography } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare";
import ButonLogout from "../Butoane/ButonLogout";
import ButonNavigareFirma from "../Butoane/ButonNavigareFirma";
import VerificareFirmaContext from "../../context/BaraNavigareContext";

const BaraNavigare = () => {
  return (
    <VerificareFirmaContext>
      <AppBar
        className="flex justify-center items-center"
        sx={{
          boxShadow: 0,
          bgcolor: "#607D8B",
        }}
        position="sticky">
        <Toolbar className="container w-4/5 flex justify-between">
          <Stack direction="row" gap={2}>
            <ButonNavigare ruta="/" text="Acasă" />
            <ButonNavigare ruta="/navigare" text="Navigare" />
            <ButonNavigare ruta="/containere" text="Containere" />
            <ButonNavigareFirma
              ruta="/containere/adauga"
              text="Adaugă container"
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <ButonNavigare ruta="/profil" text="Profil" />
            <ButonLogout />
          </Stack>
        </Toolbar>
      </AppBar>
    </VerificareFirmaContext>
  );
};

export default BaraNavigare;
