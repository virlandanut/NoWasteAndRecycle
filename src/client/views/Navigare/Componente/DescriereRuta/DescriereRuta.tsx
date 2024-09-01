import { ContainerPartial } from "../../../../../server/Utils/GA/GA";
import { List, Paper } from "@mui/material";
import Header from "../../../../componente/Titluri/Header";
import React from "react";
import { ContainerReciclare } from "../../../Container/ArataContainer/Reciclare/Interfete";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../../componente/Erori/Notificare/Notificare";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

interface DescriereRutaProps {
  ruta: ContainerPartial[] | null;
}
export const DescriereRuta = (props: DescriereRutaProps) => {
  const [containere, setContainere] = React.useState<ContainerReciclare[]>([]);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  React.useEffect(() => {
    const fetchContainereReciclare = async () => {
      try {
        const api: string | undefined = process.env.API_CONTAINER_RECICLARE;
        if (!api) {
          setNotificare({
            open: true,
            mesaj: "API-ul pentru descrierea containerelor este eronat",
            tip: "eroare",
          });
          return;
        }
        const raspuns = await fetch(api);
        if (!raspuns.ok) {
          setNotificare({
            open: true,
            mesaj:
              "Descrierea containerelor nu a putut fi obținută de la server",
            tip: "eroare",
          });
          return;
        }

        const data = await raspuns.json();
        setContainere(data.containereReciclare);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj: "Descrierea containerelor nu a putut fi obținută de la server",
          tip: "eroare",
        });
      }
    };
    fetchContainereReciclare();
  }, [props.ruta]);

  return (
    props.ruta && (
      <>
        <Header mesaj="Rută ridicare deșeuri reciclabile" />
        <Paper sx={{ maxHeight: 350, overflow: "auto" }} elevation={0}>
          <List className="w-full flex flex-col justify-center">
            {props.ruta.map((containerRuta, index) => {
              if (index !== 0) {
                const container = containere.find(
                  (container) => container.denumire === containerRuta.denumire
                );
                return (
                  <React.Fragment key={index}>
                    {container && (
                      <span className="flex flex-col gap-2 border mb-2 p-2 rounded-sm">
                        <h1 className="font-bold text-green-800">
                          {container.denumire}
                        </h1>
                        <h2 className="font-semibold text-gray-700 text-base">
                          Adresa:{" "}
                          <span className="font-normal text-gray-600 text-sm">{`Str. ${container.strada}, Nr. ${container.numar}, ${container.localitate}, Constanța`}</span>
                        </h2>
                      </span>
                    )}
                    {index < props.ruta!.length - 2 && (
                      <KeyboardArrowDownRoundedIcon
                        className="self-center"
                        color="success"
                        fontSize="large"
                      />
                    )}
                  </React.Fragment>
                );
              } else {
                return null;
              }
            })}
          </List>
        </Paper>
        <Notificare notificare={notificare} setNotificare={setNotificare} />
      </>
    )
  );
};
