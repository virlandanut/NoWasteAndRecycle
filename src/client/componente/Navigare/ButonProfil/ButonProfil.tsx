import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import React, { useState } from "react";
import ButonLogout from "../../Butoane/ButonLogout";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import ButonRaportare from "../../Butoane/ButonRaportare";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import DescriereUtilizator from "./DescriereUtilizator";
import ButonSchimbareParola from "../../Butoane/ButonSchimbareParola";

interface ButonProfilProps {
  deschideRaport: () => void;
  deschideSchimbareParola: () => void;
}

const ButonProfil = ({
  deschideRaport,
  deschideSchimbareParola,
}: ButonProfilProps) => {
  const [elementHTML, setElementHTML] = useState<null | HTMLElement>(null);
  const deschis = Boolean(elementHTML);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElementHTML(event.currentTarget);
  };

  const handleClose = () => {
    setElementHTML(null);
  };

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
          <MenuItem onClick={handleClose}>
            <FlagRoundedIcon className="text-gray-700" fontSize="small" />
            <ButonRaportare deschideRaport={deschideRaport} />
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
