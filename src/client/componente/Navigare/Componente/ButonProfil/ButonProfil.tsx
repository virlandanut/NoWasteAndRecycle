import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import React, { useContext, useState } from "react";
import ButonLogout from "../../../Butoane/ButonLogout.js";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import DescriereUtilizator from "./Componente/DescriereUtilizator.js";
import ButonSchimbareParola from "../../../../views/SchimbareParola/Componente/ButonSchimbareParola.js";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ButonProfilProps } from "./Interfete.js";
import ButonRaportare from "../../../../views/Raportare/AdaugaRaport/Componente/ButonRaportare.js";
import Eroare from "../../../../views/Eroare.js";
import ButonSchimbareDateCont from "../../../../views/SchimbareDateCont/Componente/ButonSchimbareDateCont.js";
import { ContextUtilizatorCurent } from "../../../Erori/RutaProtejata.js";
import { Utilizator } from "@prisma/client";

const ButonProfil = ({
  deschideRaport,
  deschideSchimbareParola,
  deschideSchimbareDateCont,
}: ButonProfilProps) => {
  const { utilizatorCurent, setUtilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [elementHTML, setElementHTML] = useState<null | HTMLElement>(null);
  const deschis = Boolean(elementHTML);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElementHTML(event.currentTarget);
  };

  const handleClose = () => {
    setElementHTML(null);
  };

  if (utilizatorCurent === null) {
    return <Eroare codEroare={404} mesaj="Utilizatorul curent nu există!" />;
  }

  return (
    <React.Fragment>
      <section>
        <Tooltip title="Cont">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
              ml: 2,
              transition: "all 0.3s ease-in-out",
              width: "3rem",
              height: "3rem",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#4caf50",
              },
            }}
            aria-controls={deschis ? "meniu" : undefined}
            aria-haspopup={true}
            aria-expanded={deschis ? "true" : undefined}>
            <Avatar src="/danut.jpg" sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={elementHTML}
          id="meniu"
          open={deschis}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <DescriereUtilizator />
          <Divider />
          <MenuItem onClick={handleClose}>
            <VpnKeyRoundedIcon className="text-gray-700" fontSize="small" />
            <ButonSchimbareParola
              deschideSchimbareParola={deschideSchimbareParola}
            />
          </MenuItem>
          {utilizatorCurent.rol !== "ADMINISTRATOR" && (
            <MenuItem onClick={handleClose}>
              <FlagRoundedIcon className="text-gray-700" fontSize="small" />
              <ButonRaportare deschideRaport={deschideRaport} />
            </MenuItem>
          )}
          <MenuItem onClick={handleClose}>
            <ManageAccountsIcon className="text-gray-700" fontSize="small" />
            <ButonSchimbareDateCont
              deschideSchimbareDateCont={deschideSchimbareDateCont}
            />
          </MenuItem>
          <MenuItem className="text-gray-700" onClick={handleClose}>
            <LogoutRounded fontSize="small" />
            <ButonLogout />
          </MenuItem>
        </Menu>
      </section>
    </React.Fragment>
  );
};

export default ButonProfil;
