import React from "react";
import { Button, IconButton } from "@mui/material";
import { ButonSchimbareStatusProps } from "./Interfete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

export const ButonSchimbareStatus: React.FC<ButonSchimbareStatusProps> = (
  props
) => {
  const [status, setStatus] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchStatusContainer = async (id: number) => {
      const api: string | undefined = process.env.API_CONTAINER;
      if (!api) {
        props.setNotificare({
          open: true,
          mesaj: "API-ul de obținere status container este eronat",
          tip: "eroare",
        });
        return;
      }
      try {
        const raspuns = await fetch(api + `/${id}/status`);
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
        setStatus(data);
      } catch (eroare) {
        props.setNotificare({
          open: true,
          mesaj: "Statusul containerului nu a putut fi obținut",
          tip: "eroare",
        });
      }
    };

    if (props.id) {
      fetchStatusContainer(props.id);
    }
  }, [props.id]);

  const handleChange = async () => {
    const api: string | undefined = process.env.API_CONTAINER;
    if (!api) {
      props.setNotificare({
        open: true,
        mesaj: "API-ul de schimbare status container este eronat",
        tip: "eroare",
      });
      return;
    }
    try {
      const raspuns = await fetch(api + `/actualizeazaStatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id, status }),
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
      setStatus(data.status);
    } catch (eroare) {
      props.setNotificare({
        open: true,
        mesaj: "Statusul containerului nu a putut fi schimbat",
        tip: "eroare",
      });
    }
  };

  return (
    <IconButton color={status ? "error" : "success"} onClick={handleChange}>
      {status ? <MoneyOffIcon /> : <AttachMoneyIcon />}
    </IconButton>
  );
};
