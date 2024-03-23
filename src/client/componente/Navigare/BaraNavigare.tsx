import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack, Typography } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare";
import ButonLogout from "../Butoane/ButonLogout";

const BaraNavigare = () => {
  return (
    <AppBar sx={{ m: 0, boxShadow: 0 }} position="sticky" color="success">
      <Toolbar>
        <Typography variant="h6" component="div"></Typography>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <ButonNavigare ruta="/" text="Acasă" />
          <ButonNavigare ruta="/navigare" text="Navigare" />
          <ButonNavigare ruta="/containere" text="Containere" />
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

//
