import { Button, IconButton } from "@mui/material";
import React from "react";
import { InterfataNotificare } from "../Erori/Notificare/Interfete";
import DeleteIcon from "@mui/icons-material/Delete";

interface ButonStergereContainerProps {
  id?: number;
  setNotificare: (notificare: InterfataNotificare) => void;
  tip: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
}

export const ButonStergereContainer: React.FC<ButonStergereContainerProps> = (
  props
) => {
  const handleClick = async () => {
    const api: string | undefined = process.env.API_CONTAINER;
    if (!api) {
      props.setNotificare({
        open: true,
        mesaj: "Containerul nu a putut fi șters",
        tip: "eroare",
      });
      return;
    }
    try {
      const raspuns = await fetch(api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id, tip: props.tip }),
      });
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        props.setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
        return;
      }
      const data = await raspuns.json();
      props.setNotificare({
        open: true,
        mesaj: data.mesaj,
        tip: "succes",
      });
    } catch (eroare) {
      props.setNotificare({
        open: true,
        mesaj: "Containerul nu a putut fi șters",
        tip: "eroare",
      });
    }
  };
  return (
    <IconButton color="error" onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  );
};
