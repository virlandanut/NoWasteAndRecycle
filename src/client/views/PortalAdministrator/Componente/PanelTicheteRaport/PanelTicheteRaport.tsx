import { Divider, List, ListSubheader } from "@mui/material";
import TichetRaportare from "./Componente/TichetRaportare";
import { Tichet } from "./Interfete";
import React, { useEffect, useState } from "react";
import Loading from "../../../Loading";

const PanelTicheteRaport = () => {
  const [tichete, setTichete] = useState<Tichet[] | null>(null);

  useEffect(() => {
    const getTichete = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + `/api/raport/rapoarte`
        );
        if (!raspuns.ok) {
          console.log(
            "Au existat probleme la obținerea tichetelor de la server"
          );
        }
        const ticheteRaspuns: Tichet[] = await raspuns.json();
        setTichete(ticheteRaspuns);
      } catch (eroare) {
        console.log(
          "Au existat probleme la obținerea tichetelor din baza de date",
          eroare
        );
      }
    };
    getTichete();
  }, []);

  if (tichete === null) {
    return <Loading />;
  }
  return (
    <List
      sx={{ overflow: "auto", height: "4" }}
      className="w-1/2 p-4 border border-gray-200 rounded-lg flex flex-col">
      {tichete.length > 0 ? (
        <>
          <ListSubheader
            disableSticky
            sx={{
              bgcolor: "transparent",
              color: "#ed6c02",
              fontSize: 18,
              textTransform: "uppercase",
              fontWeight: 800,
              textAlign: "center",
              height: 40,
              marginBottom: 2,
            }}>
            Tichete nerezolvate
          </ListSubheader>
          <Divider />
          {tichete.map((tichet) => (
            <React.Fragment key={tichet.id_raport_problema}>
              <TichetRaportare tichet={tichet} />
              <Divider />
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <ListSubheader
            disableSticky
            sx={{
              bgcolor: "transparent",
              color: "#2e7d32",
              fontSize: 20,
              textTransform: "uppercase",
              fontWeight: 900,
              textAlign: "center",
              height: 40,
              marginBottom: 2,
            }}>
            Toate tichetele sunt rezolvate
          </ListSubheader>
          <img className="w-1/2 self-center mt-4" src="tichete_rezolvate.svg" />
        </>
      )}
    </List>
  );
};

export default PanelTicheteRaport;
