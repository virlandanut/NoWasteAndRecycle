import { Card, CardActions, CardContent, Divider } from "@mui/material";
import { Dayjs } from "dayjs";
import ButonSubmit from "../Butoane/ButonSubmit";
import Eroare from "../../pages/Eroare";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { PretContainer } from "../../../interfaces/Interfete_Container";
import { Utilizator } from "../../../interfaces/Interfete_Utilizator";
import { Firma } from "../../../interfaces/Interfete_Firma";
import { Persoana } from "../../../interfaces/Interfete_Persoana";
import Header from "../Titluri/Header";
import Loading from "../../pages/Loading";

interface ContainerPreturiProps {
  id_container: number | undefined;
  preturi: PretContainer[];
}

interface Perioade {
  [key: string]: number;
}

interface UtilizatorCurentPersoana {
  utilizator: Utilizator;
  persoana: Persoana;
  mesaj: string;
}

interface UtilizatorCurentFirma {
  utilizator: Utilizator;
  firma: Firma;
  mesaj: string;
}

const ContainerPreturi = ({ id_container, preturi }: ContainerPreturiProps) => {
  const [dataInceput, setDataInceput] = useState<Dayjs | null>(null);
  const [dataSfarsit, setDataSfarsit] = useState<Dayjs | null>(null);
  const [pretFaraTaxa, setPretFaraTaxa] = useState<number>(0);
  const [pretTotal, setPretTotal] = useState<number>(0);
  const [perioade, setPerioade] = useState<Perioade>({});
  const [persoana, setPersoana] = useState<UtilizatorCurentPersoana | null>(
    null
  );
  const [firma, setFirma] = useState<UtilizatorCurentFirma | null>(null);

  useEffect(() => {
    const getUtilizatorCurent = async () => {
      try {
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getUtilizator"
        );
        if (!raspunsUtilizator.ok) {
          console.log("Utilizatorul nu a putut fi obținut de la server!");
        }
        const dateUtilizator = await raspunsUtilizator.json();
        if (dateUtilizator.mesaj === "Firma") {
          setFirma(dateUtilizator);
        } else if (dateUtilizator.mesaj === "Persoana") {
          setPersoana(dateUtilizator);
        }
      } catch (eroare) {
        console.log(
          "Au existat probleme la obținerea utilizatorului: ",
          eroare
        );
      }
    };
    getUtilizatorCurent();
  }, []);

  if (id_container === undefined) {
    return <Eroare />;
  }

  const handleDataInceput = (date: Dayjs | null) => {
    setDataInceput(date);
  };
  const handleDataSfarsit = (date: Dayjs | null) => {
    setDataSfarsit(date);
  };

  const calculeazaPretTotal = () => {
    if (dataInceput && dataSfarsit && preturi.length > 0) {
      const durataInZile = dataSfarsit.diff(dataInceput, "day");
      let pretTotal = 0;

      const durataTipPret: { [key: string]: number } = {
        Zi: 1,
        Săptămână: 7,
        Lună: 30,
        An: 365,
      };

      const preturiSortate = preturi.sort(
        (a, b) =>
          durataTipPret[b.denumire_tip_pret] -
          durataTipPret[a.denumire_tip_pret]
      );
      let zileRamase = durataInZile;
      const obiectPerioade: Perioade = {};

      preturiSortate.forEach((pret) => {
        const tarif = durataTipPret[pret.denumire_tip_pret];
        const numarDePerioade = Math.floor(zileRamase / tarif);
        pretTotal += numarDePerioade * pret.pret;
        zileRamase -= numarDePerioade * tarif;
        obiectPerioade[pret.denumire_tip_pret] = numarDePerioade;
      });

      pretTotal += zileRamase * durataTipPret["Zi"];

      setPretFaraTaxa(pretTotal);
      setPretTotal(pretTotal * 1.04);
      setPerioade(obiectPerioade);
    }
  };

  useEffect(() => {
    if (dataInceput && dataSfarsit) {
      calculeazaPretTotal();
    }
    console.log(perioade);
  }, [dataInceput, dataSfarsit]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card className="w-full mt-3 h-auto bg-[#FCFCFB]">
        <CardContent
          className="w-full flex flex-col gap-3"
          sx={{
            paddingTop: 2,
            paddingLeft: 2,
            paddingRight: 2,
            paddingBottom: 0,
          }}>
          <section>
            <Header mesaj="Închiriere container" />
            {persoana !== null && (
              <div>
                <h2>Nume: {persoana.persoana.nume}</h2>
              </div>
            )}
          </section>
          <div className="flex flex-col">
            <section className="flex flex-col gap-3 mb-2">
              <div className="flex gap-3">
                <DatePicker
                  className="w-1/2"
                  slotProps={{ textField: { size: "small" } }}
                  label="Dată început"
                  onChange={handleDataInceput}
                  disablePast
                />
                <DatePicker
                  className="w-1/2"
                  slotProps={{ textField: { size: "small" } }}
                  label="Dată sfârșit"
                  onChange={handleDataSfarsit}
                  disablePast
                />
              </div>
            </section>
            <section className="mt-3 mb-3">
              {Object.entries(perioade).map(([tipPret, durata]) => {
                const pret = preturi.find(
                  (pret) => pret.denumire_tip_pret === tipPret
                );
                if (pret && durata > 0) {
                  return (
                    <div className="flex justify-between">
                      <h3 key={tipPret} className="text-gray-500">
                        &#8226; {`${tipPret}`} <span>{`x ${durata}:`}</span>
                      </h3>
                      <h4>
                        <span className="text-sm font-bold text-gray-600">{`${pret.pret * durata}`}</span>{" "}
                        <span className="text-sm text-green-700">RON</span>
                      </h4>
                    </div>
                  );
                }
              })}
              {pretTotal > 0 && (
                <div className="flex justify-between">
                  <h3 className="text-gray-500">&#8226; Taxă platformă:</h3>
                  <h4>
                    <span className="text-sm font-bold text-gray-600">
                      {pretTotal - pretFaraTaxa}
                    </span>{" "}
                    <span className="text-sm text-green-700">RON</span>
                  </h4>
                </div>
              )}
            </section>
            <Divider />
            <section className="flex justify-end">
              <h2 className="mt-2">
                <span className="text-gray-500">Preț total:</span>{" "}
                <span className="font-bold text-gray-600">{pretTotal}</span>{" "}
                <span className="font-bold text-green-700">RON</span>
              </h2>
            </section>
          </div>
        </CardContent>
        <CardActions className="m-2">
          <ButonSubmit tailwind="w-full" size="small" text="Închiriere" />
        </CardActions>
      </Card>
    </LocalizationProvider>
  );
};

export default ContainerPreturi;
