import React from "react";
import {
  ContextFirmaCurenta,
  ContextUtilizatorCurent,
} from "../../componente/Erori/RutaProtejata";
import { InterfataNotificare } from "../../componente/Erori/Notificare/Interfete";
import Notificare from "../../componente/Erori/Notificare/Notificare";
import { Link, useParams } from "react-router-dom";
import { Inchirieri } from "../../../server/Routes/Utilizator/Interfete";
import CardInchiriereContainerReciclare from "./Componente/CardInchiriereContainerReciclare";
import ToggleInchiriereFirma from "./Componente/Componente/ToggleInchiriereFirma";

import {
  FormControl,
  FormLabel,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
} from "@mui/material";
import CardInchiriereContainerDepozitare from "./Componente/CardInchiriereContainerDepozitare";

const InchirieriContainere = () => {
  const { nume_utilizator } = useParams();
  const [containereInchiriate, setContainereInchirieri] =
    React.useState<Inchirieri | null>(null);
  const [tipInchiriereFirma, setTipInchiriereFirma] = React.useState<number>(0);
  const [filtru, setFiltru] = React.useState<string>("0");
  const [inchirieriClienti, setInchirieriClienti] =
    React.useState<string>("personale");
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const { firmaCurenta } = React.useContext(ContextFirmaCurenta);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setFiltru(event.target.value as string);
  };

  const handleChangeInchirieri = (event: SelectChangeEvent) => {
    setInchirieriClienti(event.target.value as string);
  };

  React.useEffect(() => {
    let api: string | undefined;
    if (utilizatorCurent && utilizatorCurent.rol === "FIRMA") {
      if (inchirieriClienti === "personale") {
        api = process.env.API_UTILIZATOR + `${nume_utilizator}/inchirieri`;
      } else {
        if (utilizatorCurent) {
          api =
            process.env.API_FIRMA +
            `${utilizatorCurent.id_utilizator}/inchirieri`;
        }
      }
    } else {
      api = process.env.API_UTILIZATOR + `${nume_utilizator}/inchirieri`;
    }

    if (!api) {
      setNotificare({
        open: true,
        mesaj: "API-ul închirierilor este eronat",
        tip: "eroare",
      });
      return;
    }

    const fetchInchirieri = async (nume_utilizator: string) => {
      try {
        const raspuns = await fetch(api);
        if (!raspuns.ok) {
          setNotificare({
            open: true,
            mesaj: `Închirierile utilizatorului ${nume_utilizator} nu au putut fi obținute de la server`,
            tip: "eroare",
          });
          return;
        }

        const data = await raspuns.json();
        setContainereInchirieri(data);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj: `Închirierile utilizatorului ${nume_utilizator} nu au putut fi obținute de la server`,
          tip: "eroare",
        });
        return;
      }
    };

    if (!nume_utilizator) {
      setNotificare({
        open: true,
        mesaj: `Numele de utilizator nu există`,
        tip: "eroare",
      });
      return;
    }
    fetchInchirieri(nume_utilizator);
  }, [nume_utilizator, inchirieriClienti, utilizatorCurent]);

  return (
    utilizatorCurent && (
      <>
        {utilizatorCurent.rol === "FIRMA" ? (
          <main className="min-w-screen min-h-screen flex justify-center">
            <div className="w-2/3 bg-[#f8f9fa] flex-col items-start gap-5 shadow-sm xs:flex-col xs:w-3/4 sm:flex-col sm:w-3/4 md:flex-col md:w-3/4 lg:flex-row lg:w-2/3 p-10">
              <div className="w-full flex justify-center mb-10">
                <ToggleInchiriereFirma
                  setTipInchiriere={setTipInchiriereFirma}
                />
              </div>
              <div className="flex justify-end gap-2 mb-3">
                {utilizatorCurent.rol === "FIRMA" &&
                  firmaCurenta &&
                  firmaCurenta.status_aprobare && (
                    <FormControl>
                      <InputLabel color="success">Tip închirieri</InputLabel>
                      <Select
                        label="Tip închirieri"
                        value={inchirieriClienti}
                        onChange={handleChangeInchirieri}
                        color="success"
                        size="small">
                        <MenuItem value={"personale"}>Personale</MenuItem>
                        <MenuItem value={"clienti"}>Clienți</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                <FormControl>
                  <InputLabel color="success">Perioadă</InputLabel>
                  <Select
                    label="Perioadă"
                    value={filtru}
                    onChange={handleChange}
                    color="success"
                    size="small">
                    <MenuItem value={0}>În vigoare</MenuItem>
                    <MenuItem value={1}>Urmează</MenuItem>
                    <MenuItem value={2}>Finalizat</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {tipInchiriereFirma === 0 &&
                containereInchiriate &&
                containereInchiriate.containereReciclare && (
                  <CardInchiriereContainerReciclare
                    viewFirmaProprietar={inchirieriClienti === "clienti"}
                    containerReciclare={
                      containereInchiriate.containereReciclare
                    }
                    filtru={parseInt(filtru)}
                  />
                )}
              {tipInchiriereFirma === 1 &&
                containereInchiriate &&
                containereInchiriate.containereDepozitare && (
                  <CardInchiriereContainerDepozitare
                    viewFirmaProprietar={inchirieriClienti === "clienti"}
                    containerDepozitare={
                      containereInchiriate.containereDepozitare
                    }
                    filtru={parseInt(filtru)}
                  />
                )}

              <Notificare
                notificare={notificare}
                setNotificare={setNotificare}
              />
            </div>
          </main>
        ) : (
          <main className="min-w-screen min-h-screen flex justify-center">
            <div className="w-2/3 bg-[#f8f9fa] flex-col items-start gap-5 shadow-sm xs:flex-col xs:w-3/4 sm:flex-col sm:w-3/4 md:flex-col md:w-3/4 lg:flex-row lg:w-2/3 p-10">
              <div className="flex justify-end mb-3">
                <FormControl>
                  <Select
                    value={filtru}
                    onChange={handleChange}
                    color="success"
                    size="small">
                    <MenuItem value={0}>În vigoare</MenuItem>
                    <MenuItem value={1}>Urmează</MenuItem>
                    <MenuItem value={2}>Finalizat</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {containereInchiriate &&
                containereInchiriate.containereDepozitare && (
                  <CardInchiriereContainerDepozitare
                    containerDepozitare={
                      containereInchiriate.containereDepozitare
                    }
                    filtru={parseInt(filtru)}
                  />
                )}
              <Notificare
                notificare={notificare}
                setNotificare={setNotificare}
              />
            </div>
          </main>
        )}
      </>
    )
  );
};

export default InchirieriContainere;
