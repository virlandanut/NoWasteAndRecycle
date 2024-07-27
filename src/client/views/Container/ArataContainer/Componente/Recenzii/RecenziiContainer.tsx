import React from "react";
import { RecenziiContainerCuRelatii } from "../../../../../../server/Routes/Container/Inchiriere/Interfete";
import { RecenzieCompleta } from "../../Depozitare/Interfete";
import { InterfataNotificare } from "../../../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../../../componente/Erori/Notificare/Notificare";
import Recenzie from "./Componente/Recenzie";
import { Divider, List, Paper } from "@mui/material";

interface RecenziiContainerProps {
  idContainer: number;
}

const RecenziiContainer: React.FC<RecenziiContainerProps> = ({
  idContainer,
}) => {
  const [recenzii, setRecenzii] = React.useState<RecenzieCompleta[] | null>(
    null
  );
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  console.log(recenzii);

  React.useEffect(() => {
    const fetchRecenzii = async () => {
      try {
        const api: string | undefined = process.env.API_CONTAINER_DEPOZITARE;
        if (!api) {
          setNotificare({
            open: true,
            mesaj: "API-ul recenziilor este eronat",
            tip: "eroare",
          });
          return;
        }

        const raspuns = await fetch(api + `/${idContainer}/recenzii`);
        if (!raspuns.ok) {
          const eroare = await raspuns.json();
          setNotificare({
            open: true,
            mesaj: eroare.mesaj,
            tip: "eroare",
          });
        }
        const recenzii = await raspuns.json();
        setRecenzii(recenzii);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj:
            "Recenziile containerului nu au putut fi obținute de la server",
          tip: "eroare",
        });
      }
    };

    fetchRecenzii();
  }, []);

  return (
    recenzii && (
      <Paper
        className="w-full"
        elevation={0}
        sx={{
          paddingX: 1,
        }}
        style={{
          maxHeight: 400,
          overflow: "auto",
          backgroundColor: "transparent",
        }}>
        <List className="flex flex-col gap-1">
          {recenzii.map((recenzie, index) => (
            <Recenzie key={recenzie.id} recenzie={recenzie} />
          ))}
          <Notificare notificare={notificare} setNotificare={setNotificare} />
        </List>
      </Paper>
    )
  );
};

export default RecenziiContainer;
