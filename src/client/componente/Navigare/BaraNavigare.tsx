import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Stack } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare.js";
import ButonProfil from "./Componente/ButonProfil/ButonProfil.js";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import ButoaneNotificari from "./Componente/ButonProfil/Componente/ButoaneNotificari/ButoaneNotificari.js";
import { Link } from "react-router-dom";
import CardRaportare from "../../views/Raportare/AdaugaRaport/CardRaportare.js";
import CarduriSchimbareParola from "../../views/SchimbareParola/CarduriSchimbareParola.js";
import CardSchimbareDateCont from "../../views/SchimbareDateCont/CardSchimbareDateCont.js";
import { ContextFirmaCurenta, ContextUtilizatorCurent } from "../Erori/RutaProtejata.js";
import { Firma, Utilizator } from "@prisma/client";
import React from "react";

const BaraNavigare = () => {
  const [raportare, setRaportare] = React.useState<boolean>(false);
  const [schimbareParola, setSchimbareParola] = React.useState<boolean>(false);
  const [schimbareDateCont, setSchimbareDateCont] = React.useState<boolean>(false);
  const { utilizatorCurent, setUtilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const { firmaCurenta, setFirmaCurenta } = React.useContext(ContextFirmaCurenta)

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

  const deschideSchimbareDateCont = () => {
    setSchimbareDateCont(true);
  };

  const inchideSchimbareDateCont = () => {
    setSchimbareDateCont((prev) => !prev);
  };

  return (
    utilizatorCurent !== null && (
      <>
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
              {(utilizatorCurent.rol === "FIRMA" && firmaCurenta && firmaCurenta.status_aprobare) && <ButonNavigare ruta="/containere/adauga"
                text="Adaugă container" />}
              {utilizatorCurent.rol === "ADMINISTRATOR" && (
                <ButonNavigare
                  ruta="/portal"
                  text="Portal Admin"
                  culoare="#ef5350"
                />
              )}
            </Stack>
            <Stack className="flex items-center" direction="row" gap={2}>
              {utilizatorCurent.rol !== "ADMINISTRATOR" && (
                <ButoaneNotificari />
              )}
              <ButonProfil
                deschideRaport={deschideRaport}
                deschideSchimbareParola={deschideSchimbareParola}
                deschideSchimbareDateCont={deschideSchimbareDateCont}
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
        <CardSchimbareDateCont
          schimbareDateCont={schimbareDateCont}
          inchideSchimbareDateCont={inchideSchimbareDateCont}
          renunta={inchideSchimbareDateCont}
          utilizatorCurent={utilizatorCurent}
        />
      </>
    )
  );
};

export default BaraNavigare;
