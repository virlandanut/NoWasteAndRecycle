import React from "react";
import { RecenzieCompleta } from "../../Depozitare/Interfete";
import { InterfataNotificare } from "../../../../../componente/Erori/Notificare/Interfete";
import Recenzie from "./Componente/Recenzie/Recenzie";
import { List, Paper } from "@mui/material";

interface RecenziiContainerProps {
  idContainer: number;
  setNotificare: (notificare: InterfataNotificare) => void;
}

const RecenziiContainer: React.FC<RecenziiContainerProps> = (props) => {
  const [recenzii, setRecenzii] = React.useState<RecenzieCompleta[] | null>(
    null
  );
  const [refresh, setRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchRecenzii = async () => {
      try {
        const api: string | undefined = process.env.API_CONTAINER_DEPOZITARE;
        if (!api) {
          props.setNotificare({
            open: true,
            mesaj: "API-ul recenziilor este eronat",
            tip: "eroare",
          });
          return;
        }

        const raspuns = await fetch(api + `/${props.idContainer}/recenzii`);
        const data = await raspuns.json();
        if (data.recenzii === false) {
          setRecenzii(null);
          return;
        }
        setRecenzii(data);
      } catch (eroare) {
        props.setNotificare({
          open: true,
          mesaj:
            "Recenziile containerului nu au putut fi obținute de la server",
          tip: "eroare",
        });
      }
    };

    fetchRecenzii();
  }, [refresh, props.idContainer]);

  return (
    recenzii && (
      <Paper
        className="w-full"
        elevation={0}
        sx={{
          paddingX: 1,
        }}
        style={{
          maxHeight: 425,
          overflow: "auto",
          backgroundColor: "transparent",
        }}>
        <List className="flex flex-col gap-1">
          {recenzii.map((recenzie) => (
            <Recenzie
              refreshInformatii={() => setRefresh(!refresh)}
              setNotificare={props.setNotificare}
              key={recenzie.id}
              recenzie={recenzie}
            />
          ))}
        </List>
      </Paper>
    )
  );
};

export default RecenziiContainer;
