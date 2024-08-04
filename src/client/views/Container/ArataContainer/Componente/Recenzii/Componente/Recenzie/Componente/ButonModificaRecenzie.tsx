import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

interface ButonModificaRecenzieProps {
  modificaRecenzie: () => void;
}

export const ButonModificaRecenzie: React.FC<ButonModificaRecenzieProps> = (
  props
) => {
  return (
    <Button
      onClick={props.modificaRecenzie}
      startIcon={<EditIcon color="success" />}
      sx={{
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
      }}
      color="inherit"
      size="small">
      <span className="text-green-600 font-bold">Modifică recenzie</span>
    </Button>
  );
};
