import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Stack } from "@mui/material";
import ButonNavigare from "../Butoane/ButonNavigare.js";
import ButonProfil from "./Componente/ButonProfil/ButonProfil.js";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import ButoaneNotificari from "./Componente/ButonProfil/Componente/ButoaneNotificari/ButoaneNotificari.js";
import { Link } from "react-router-dom";
import CardRaportare from "../../views/Raportare/AdaugaRaport/CardRaportare.js";
import { createContext, useEffect, useState } from "react";
import CarduriSchimbareParola from "../../views/SchimbareParola/CarduriSchimbareParola.js";
import { UtilizatorCurent } from "../../views/Raportare/ArataRaport/Interfete.js";
import CardSchimbareDateCont from "../../views/SchimbareDateCont/CardSchimbareDateCont.js";

export const UtilizatorCurentContext = createContext<UtilizatorCurent | null>(
  null
);

const BaraNavigare = () => {
  const [raportare, setRaportare] = useState<boolean>(false);
  const [schimbareParola, setSchimbareParola] = useState<boolean>(false);
  const [schimbareDateCont, setSchimbareDateCont] = useState<boolean>(false);
  const [utilizatorCurent, setUtilizatorCurent] =
    useState<UtilizatorCurent | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getIdRolUtilizatorCurent"
        );
        if (!raspunsUtilizator.ok) {
          console.log("Utilizatorul curent nu a putut fi obținut de la server");
        }
        const dateUtilizator: UtilizatorCurent = await raspunsUtilizator.json();
        setUtilizatorCurent(dateUtilizator);
      } catch (eroare) {
        console.log("Eroare fetch data în componenta BaraNavigare: ", eroare);
      }
    };
    fetchData();
  }, []);

  return (
    utilizatorCurent !== null && (
      <UtilizatorCurentContext.Provider value={utilizatorCurent}>
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
              {(["firma", "administrator"].includes(utilizatorCurent.rol)) && <ButonNavigare ruta="/containere/adauga"
                text="Adaugă container" />}
              {utilizatorCurent.rol === "administrator" && (
                <ButonNavigare
                  ruta="/portal"
                  text="Portal Admin"
                  culoare="#ef5350"
                />
              )}
            </Stack>
            <Stack className="flex items-center" direction="row" gap={2}>
              {utilizatorCurent.rol !== "administrator" && (
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
          utilizatorCurent={utilizatorCurent.rol}
        />
      </UtilizatorCurentContext.Provider>
    )
  );
};

export default BaraNavigare;
