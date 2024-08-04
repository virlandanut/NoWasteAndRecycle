import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { ButonModificaRecenzie } from "./ButonModificaRecenzie";
import { ButonStergereRecenzie } from "./ButonStergereRecenzie";
import { InterfataNotificare } from "../../../../../../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../../../../../../componente/Erori/Notificare/Notificare";
import { Utilizator } from "@prisma/client";

interface OptiuneRecenzieProps {
  idRecenzie: number;
  setNotificare: (notificare: InterfataNotificare) => void;
  refreshInformatii: () => void;
  utilizatorCurent: number;
  proprietar: number;
  modificareRecenzie: () => void;
}

export const OptiuniRecenzie = (props: OptiuneRecenzieProps) => {
  const [elementHTML, setElementHTML] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(elementHTML);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElementHTML(event.currentTarget);
  };

  const handleClose = () => {
    setElementHTML(null);
  };
  return (
    <React.Fragment>
      <IconButton
        id="optiuniRecenzie"
        aria-controls={open ? "optiuni" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <Badge badgeContent={0} color="success">
          <MoreVertIcon />
        </Badge>
      </IconButton>
      <Menu
        id="optiuni"
        MenuListProps={{ "aria-labelledby": "optiuniTichet" }}
        anchorEl={elementHTML}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: 45 * 4.5,
              width: "auto",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {props.utilizatorCurent === props.proprietar && (
          <MenuItem onClick={handleClose}>
            <ButonModificaRecenzie
              modificaRecenzie={props.modificareRecenzie}
            />
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <ButonStergereRecenzie
            setNotificare={props.setNotificare}
            id={props.idRecenzie}
            refreshInformatii={props.refreshInformatii}
          />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
