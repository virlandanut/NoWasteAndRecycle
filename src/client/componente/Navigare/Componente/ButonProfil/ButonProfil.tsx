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
import {
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
} from "../../../Erori/RutaProtejata.js";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { AvatarUtilizator } from "./Componente/AvatarUtilizator/AvatarUtilizator.js";
import { ButonSchimbarePoza } from "../../../../views/SchimbaPozaProfil/Componente/ButonSchimbarePoza.js";

const ButonProfil = ({
  deschideRaport,
  deschideSchimbareParola,
  deschideSchimbareDateCont,
  deschideSchimbarePoza,
}: ButonProfilProps) => {
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const { persoanaCurenta } = React.useContext(ContextPersoanaCurenta);
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
            {persoanaCurenta ? (
              <AvatarUtilizator
                poza={utilizatorCurent.poza}
                tip={utilizatorCurent.rol}
                cnp={persoanaCurenta.cnp}
              />
            ) : (
              <AvatarUtilizator
                poza={utilizatorCurent.poza}
                tip={utilizatorCurent.rol}
              />
            )}
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
          <Divider sx={{ marginBottom: 1 }} />
          <div className="flex flex-col">
            <MenuItem onClick={handleClose} sx={{ paddingX: 2, paddingY: 0 }}>
              <VpnKeyRoundedIcon className="text-gray-700" fontSize="small" />
              <ButonSchimbareParola
                deschideSchimbareParola={deschideSchimbareParola}
              />
            </MenuItem>
            {utilizatorCurent.rol !== "ADMINISTRATOR" && (
              <MenuItem onClick={handleClose} sx={{ paddingX: 2, paddingY: 0 }}>
                <FlagRoundedIcon className="text-gray-700" fontSize="small" />
                <ButonRaportare deschideRaport={deschideRaport} />
              </MenuItem>
            )}
            <MenuItem onClick={handleClose} sx={{ paddingX: 2, paddingY: 0 }}>
              <ManageAccountsIcon className="text-gray-700" fontSize="small" />
              <ButonSchimbareDateCont
                deschideSchimbareDateCont={deschideSchimbareDateCont}
              />
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ paddingX: 2, paddingY: 0 }}>
              <ImageRoundedIcon className="text-gray-700" fontSize="small" />
              <ButonSchimbarePoza
                deschideSchimbarePoza={deschideSchimbarePoza}
              />
            </MenuItem>
            <MenuItem
              className="text-gray-700"
              onClick={handleClose}
              sx={{ paddingX: 2, paddingY: 0 }}>
              <LogoutRounded fontSize="small" />
              <ButonLogout />
            </MenuItem>
          </div>
        </Menu>
      </section>
    </React.Fragment>
  );
};

export default ButonProfil;
