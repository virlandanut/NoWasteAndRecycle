import { Button, IconButton } from "@mui/material";
import React from "react";
import { InterfataNotificare } from "../Erori/Notificare/Interfete";
import DeleteIcon from "@mui/icons-material/Delete";
import { redirect, useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";

interface ButonStergereContainerProps {
  id?: number;
  setNotificare: (notificare: InterfataNotificare) => void;
  tip: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
}

export const ButonStergereContainer: React.FC<ButonStergereContainerProps> = (
  props
) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(true);
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
      setLoading(false);
      setTimeout(() => {
        props.setNotificare({
          open: true,
          mesaj: data.mesaj,
          tip: "succes",
        });
      }, 500);

      setTimeout(() => {
        navigate("/containere");
      }, 800);
    } catch (eroare) {
      setLoading(false);
      props.setNotificare({
        open: true,
        mesaj: "Containerul nu a putut fi șters",
        tip: "eroare",
      });
    }
  };
  return (
    <React.Fragment>
      <IconButton color="error" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
      <Loading deschis={loading} />
    </React.Fragment>
  );
};
