import { Divider, List, ListSubheader } from "@mui/material";
import CardFirma from "./Componente/CardFirma";
import { useEffect, useState } from "react";
import { Firma } from "./Interfete";

const PanelFirme = () => {
  const [firme, setFirme] = useState<Firma[]>();

  useEffect(() => {
    const getFirme = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + `/api/admin/portal/firme`
        );
        if (!raspuns.ok) {
        }
        const data = await raspuns.json();
        setFirme(data);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    getFirme();
  }, []);
  return (
    firme && (
      <List
        sx={{ overflow: "auto", height: "4" }}
        className="w-1/2 p-4 border border-gray-200 rounded-lg flex flex-col">
        <ListSubheader
          disableSticky
          sx={{
            bgcolor: "transparent",
            color: "#2e7d32",
            fontSize: 18,
            textTransform: "uppercase",
            fontWeight: 800,
            textAlign: "center",
            height: 40,
            marginBottom: 2,
          }}>
          Administrare drepturi firme
        </ListSubheader>
        <Divider />
        {firme.map((firma) => (
          <div key={firma.id_utilizator}>
            <CardFirma firma={firma} />
            <Divider />
          </div>
        ))}
      </List>
    )
  );
};

export default PanelFirme;
