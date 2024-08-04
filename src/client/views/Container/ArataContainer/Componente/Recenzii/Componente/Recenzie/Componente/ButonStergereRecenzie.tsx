import { Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React from "react";
import { InterfataNotificare } from "../../../../../../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../../../../../../componente/Erori/Notificare/Notificare";

interface ButonStergereRecenzieProps {
  id: number;
  setNotificare: (notificare: InterfataNotificare) => void;
  refreshInformatii: () => void;
}

export const ButonStergereRecenzie = (props: ButonStergereRecenzieProps) => {
  const stergeRecenzie = async () => {
    try {
      const api: string | undefined = process.env.API_RECENZIE;
      console.log(api);
      if (!api) {
        props.setNotificare({
          open: true,
          mesaj: "API-ul recenziei este eronat",
          tip: "eroare",
        });
        return;
      }
      const raspuns = await fetch(api + `/${props.id}`, {
        method: "DELETE",
      });
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        props.setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
      } else {
        const data = await raspuns.json();
        props.setNotificare({
          open: true,
          mesaj: data.mesaj,
          tip: "succes",
        });
        props.refreshInformatii();
      }
    } catch (eroare) {
      props.setNotificare({
        open: true,
        mesaj: "Recenzia nu a putut fi ștearsă",
        tip: "eroare",
      });
    }
  };

  return (
    <Button
      startIcon={<DeleteRoundedIcon color="error" />}
      sx={{
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
      }}
      color="inherit"
      size="small"
      onClick={stergeRecenzie}>
      <span className="text-red-600 font-bold">Șterge recenzie</span>
    </Button>
  );
};
