import React from "react";
import { Box, Button, Divider, List, Paper, TextField } from "@mui/material";
import { ButonChatBot } from "./Componente/ButonChatBot";
import SendIcon from "@mui/icons-material/Send";
import Grow from "@mui/material/Grow";
import CircleIcon from "@mui/icons-material/Circle";
import { LeafyComment } from "./Componente/LeafyComment";
import { UserComment } from "./Componente/UserComment";
import {
  ContextFirmaCurenta,
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
} from "../Erori/RutaProtejata";

export const ChatBot = () => {
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const { firmaCurenta } = React.useContext(ContextFirmaCurenta);
  const { persoanaCurenta } = React.useContext(ContextPersoanaCurenta);
  const [openChatBot, setOpenChatBot] = React.useState<boolean>(false);
  const [mesajeLeafy, setMesajeLeafy] = React.useState<string[]>([]);
  const [mesajeUtilizator, setMesajeUtilizator] = React.useState<string[]>([]);

  const handleChange = () => {
    if (!openChatBot) {
      if (
        utilizatorCurent &&
        utilizatorCurent.rol === "FIRMA" &&
        firmaCurenta
      ) {
        setMesajeLeafy((prev) => [
          ...prev,
          `Bună ${firmaCurenta.denumire_firma}, numele meu este Leafy 🌱, cu ce vă pot fi de folos? 😊`,
        ]);
      } else if (persoanaCurenta) {
        setMesajeLeafy((prev) => [
          ...prev,
          `Bună ${persoanaCurenta.prenume}, numele meu este Leafy 🌱, cu ce îți pot fi de folos? 😊`,
        ]);
      }
    } else {
      mesajeLeafy.splice(0, mesajeLeafy.length);
      mesajeUtilizator.splice(0, mesajeUtilizator.length);
    }
    setOpenChatBot((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const mesaj: string = event.target.mesaj.value;
    setMesajeUtilizator((prev) => [...prev, mesaj]);
    try {
      const api: string | undefined = process.env.API_CHAT_BOT;
      if (!api) {
        mesajeLeafy.push("API-ul este eronat");
        return;
      }
      const raspuns = await fetch(api, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ mesaj }),
      });
      if (!raspuns.ok) {
        setMesajeLeafy((prev) => [
          ...prev,
          "Au existat probleme la obținerea răspunsului de la server",
        ]);
        return;
      }
      const raspunsLeafy = await raspuns.json();
      setTimeout(() => {
        setMesajeLeafy((prev) => [...prev, raspunsLeafy.raspuns]);
      }, 500);
      event.target.mesaj.value = "";
    } catch (eroare) {
      setMesajeLeafy((prev) => [
        ...prev,
        "Conexiunea cu server-ul nu a putut fi stabilită, vă rugăm să luați legătura cu un administrator!",
      ]);
    }
  };

  return (
    <div className="fixed w-1/4 h-full z-[1000]">
      <Grow
        in={openChatBot}
        style={{ transformOrigin: "bottom right" }}
        {...(openChatBot ? { timeout: 1000 } : {})}>
        <Paper
          className="flex flex-col justify-between w-1/3 h-1/2 overflow-hidden"
          sx={{ position: "fixed", top: "42%", left: "62%", zIndex: "999" }}
          elevation={4}>
          <header>
            <div className="flex items-center gap-1 px-4 py-2">
              <h1 className="font-bold text-lg">Leafy</h1>
              <CircleIcon
                sx={{ fontSize: "0.75rem", alignSelf: "center" }}
                color="success"
              />
            </div>
            <Divider />
          </header>
          <Paper
            className="h-full flex flex-col gap-4 justify-end p-4"
            style={{ overflow: "auto", overflowY: "scroll" }}
            elevation={0}>
            {mesajeLeafy.map((mesaj, index) => (
              <React.Fragment key={index}>
                <LeafyComment
                  mesaj={mesaj}
                  marginTop={index === 0 ? true : false}
                />
                {mesajeUtilizator[index] && (
                  <UserComment
                    utilizatorCurent={utilizatorCurent}
                    firmaCurenta={firmaCurenta}
                    persoanaCurenta={persoanaCurenta}
                    mesaj={mesajeUtilizator[index]}
                  />
                )}
              </React.Fragment>
            ))}
          </Paper>
          <form onSubmit={onSubmit} className="flex gap-2 w-full px-4 py-4">
            <TextField
              className="w-3/4"
              size="small"
              variant="outlined"
              color="success"
              name="mesaj"
            />
            <Button
              type="submit"
              className="w-1/4"
              variant="contained"
              endIcon={<SendIcon />}
              color="success"
              size="small">
              trimite
            </Button>
          </form>
        </Paper>
      </Grow>
      <ButonChatBot setOpenChatBot={handleChange} />
    </div>
  );
};
