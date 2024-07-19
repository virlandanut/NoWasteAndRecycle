import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ButonSolutionare from "./Componente/ButonSolutionare";
import ButonStergere from "./Componente/ButonStergere";
import { OptiuneTichetProps } from "./Componente/Interfete";

const OptiuniTichet = ({
  id_tichet,
  status,
  setRefreshInformatii,
  setNotificare,
}: OptiuneTichetProps) => {
  const [elementHTML, setElementHTML] = useState<null | HTMLElement>(null);
  const open = Boolean(elementHTML);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElementHTML(event.currentTarget);
  };

  const handleClose = () => {
    setElementHTML(null);
  };
  return (
    <>
      <IconButton
        id="optiuniTichet"
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
        {!status && (
          <MenuItem onClick={handleClose}>
            <ButonSolutionare
              id_tichet={id_tichet}
              setRefreshInformatii={setRefreshInformatii}
              setNotificare={setNotificare}
            />
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <ButonStergere id_tichet={id_tichet} setNotificare={setNotificare} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default OptiuniTichet;
