import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Stack } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare.js";
import ButonNavigareFirma from "../Butoane/ButonNavigareFirma.js";
import VerificareFirmaContext from "../../context/BaraNavigareContext.js";
import ButonProfil from "./Componente/ButonProfil/ButonProfil.js";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import ButoaneNotificari from "../Butoane/ButoaneNotificari.js";
import { Link } from "react-router-dom";
import CardRaportare from "../../views/Raportare/CardRaportare.js";
import { useState } from "react";
import CarduriSchimbareParola from "../../views/SchimbareParola/CarduriSchimbareParola.js";

const BaraNavigare = () => {
  const [raportare, setRaportare] = useState<boolean>(false);
  const [schimbareParola, setSchimbareParola] = useState<boolean>(false);

  const deschideSchimbareParola = () => {
    setSchimbareParola(true);
  };

  const inchideSchimbareParola = () => {
    setSchimbareParola((prev) => !prev);
  };

  const deschideRaport = () => {
    setRaportare(true);
  };

  const inchideRaport = () => {
    setRaportare((prev) => !prev);
  };

  return (
    <VerificareFirmaContext>
      <AppBar
        className="flex justify-center items-center"
        sx={{
          border: "0px",
          boxShadow: "none",
          bgcolor: "transparent",
          zIndex: 999,
        }}
        position="static">
        <Toolbar className="container w-4/5 flex justify-between">
          <Stack className="flex items-center" direction="row" gap={2}>
            <IconButton>
              <Link to={"/"}>
                <SpaRoundedIcon color="success" fontSize="large" />
              </Link>
            </IconButton>
            <ButonNavigare ruta="/" text="Acasă" />
            <ButonNavigare ruta="/navigare" text="Navigare" />
            <ButonNavigare ruta="/containere" text="Containere" />
            <ButonNavigareFirma
              ruta="/containere/adauga"
              text="Adaugă container"
            />
          </Stack>
          <Stack className="flex items-center" direction="row" gap={2}>
            <ButoaneNotificari />
            <ButonProfil
              deschideRaport={deschideRaport}
              deschideSchimbareParola={deschideSchimbareParola}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      <CardRaportare
        raportare={raportare}
        inchideRaport={inchideRaport}
        renunta={inchideRaport}
      />
      <CarduriSchimbareParola
        schimbareParola={schimbareParola}
        inchideSchimbareParola={inchideSchimbareParola}
        renunta={inchideSchimbareParola}
      />
    </VerificareFirmaContext>
  );
};

export default BaraNavigare;
