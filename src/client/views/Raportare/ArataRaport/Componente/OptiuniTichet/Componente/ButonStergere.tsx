import { Button, Snackbar, SnackbarContent } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ButonStergereProps } from "./Interfete";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Notificare } from "../../AdaugaComentariu/Interfete";

const ButonStergere = ({ id_tichet, setNotificare }: ButonStergereProps) => {
  const navigate = useNavigate();

  const stergereTichet = async () => {
    try {
      const raspuns = await fetch(process.env.API_BASE + `/api/raport/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_tichet }),
      });
      if (!raspuns.ok) {
        if (raspuns.status === 403) {
          setNotificare({
            open: true,
            mesaj: "Nu aveți permisiune să ștergeți tichetul!",
            culoare: "#ef5350",
          });
        }
      } else {
        setNotificare({
          open: true,
          mesaj: "Tichetul a fost șters cu succes!",
          culoare: "#15803d",
        });
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Au existat probleme la ștergerea tichetului",
        culoare: "#ef5350",
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
      onClick={stergereTichet}>
      <span className="text-red-600 font-bold">Șterge tichet</span>
    </Button>
  );
};

export default ButonStergere;
