import { Card, CardActions, CardContent, Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import ButonSubmit from "../../Butoane/ButonSubmit.js";
import Eroare from "../../../views/Eroare.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { PretContainer } from "../../../../server/Interfete/Interfete_Container.js";
import { Utilizator } from "../../../../server/Interfete/Interfete_Utilizator.js";
import { Firma } from "../../../../server/Interfete/Interfete_Firma.js";
import { Persoana } from "../../../../server/Interfete/Interfete_Persoana.js";
import Header from "../../Titluri/Header.js";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../../../views/Loading.js";
import MesajEroare from "../../Erori/MesajEroare/MesajEroare.js";
import {
  ContainerPreturiProps,
  FormInchiriereDepozitare,
  Perioade,
  UtilizatorCurentFirma,
  UtilizatorCurentPersoana,
} from "./Interfete.js";

const ContainerPreturi = ({
  id_container,
  id_utilizator,
  preturi,
}: ContainerPreturiProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInchiriereDepozitare>();
  const [dataInceput, setDataInceput] = useState<Dayjs | null>(null);
  const [dataSfarsit, setDataSfarsit] = useState<Dayjs | null>(null);
  const [pretFaraTaxa, setPretFaraTaxa] = useState<number>(0);
  const [pretTotal, setPretTotal] = useState<number>(0);
  const [perioade, setPerioade] = useState<Perioade>({});
  const [persoana, setPersoana] = useState<UtilizatorCurentPersoana | null>(
    null
  );
  const [pretCuTVA, setPretCuTVA] = useState<number>(0);
  const [firma, setFirma] = useState<UtilizatorCurentFirma | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          setLoading(false);
        } else if (dateUtilizator.mesaj === "Persoana") {
          setPersoana(dateUtilizator);
          setLoading(false);
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

      let zileRamase: number;
      if (durataInZile === 0) {
        zileRamase = 1;
      } else {
        zileRamase = durataInZile;
      }

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
      setPretTotal(Math.floor(pretTotal * 1.04));
      setPretCuTVA(Math.floor(pretTotal * 1.04 * 1.19));
      setPerioade(obiectPerioade);
    }
  };

  useEffect(() => {
    if (dataInceput && dataSfarsit && dataSfarsit.isAfter(dataInceput)) {
      calculeazaPretTotal();
    }
  }, [dataInceput, dataSfarsit]);

  const onSubmit: SubmitHandler<FormInchiriereDepozitare> = async (data) => {
    if (firma) {
      data = {
        ...data,
        id_utilizator: firma.utilizator.id_utilizator!,
        id_container: id_container,
        pretTotal: pretCuTVA,
      };
    }
    if (persoana) {
      data = {
        ...data,
        id_utilizator: persoana.utilizator.id_utilizator!,
        id_container: id_container,
        pretTotal: pretCuTVA,
      };
    }
    console.log(data);
  };

  if (id_utilizator === undefined) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {!(firma?.firma.id_utilizator === id_utilizator) && (
        <Card className="w-full h-auto bg-[#FCFCFB]">
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
                <div className="mt-2">
                  <h2>
                    <span className="text-gray-600 font-semibold">Nume: </span>
                    <span className="text-gray-500">{`${persoana.persoana.nume} ${persoana.persoana.prenume}`}</span>
                  </h2>
                  <h2>
                    <span className="text-gray-600 font-semibold">Rol: </span>
                    <span className="text-gray-500">
                      Utilizator {persoana.persoana.rol}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-gray-600 font-semibold">
                      Adresă:{" "}
                    </span>{" "}
                    <span className="text-gray-500">{`Str. ${persoana.utilizator.strada}, Nr. ${persoana.utilizator.numar}, ${persoana.utilizator.localitate}, Constanța`}</span>
                  </h2>
                  <h2>
                    <span className="text-gray-600 font-semibold">Email: </span>{" "}
                    <span className="text-gray-500">{`${persoana.utilizator.email}`}</span>
                  </h2>
                </div>
              )}

              {firma !== null && (
                <div className="mt-2">
                  <h2>
                    <span className="text-gray-600 font-semibold">
                      Denumire:{" "}
                    </span>
                    <span className="text-gray-500">{`${firma.firma.denumire_firma}`}</span>
                  </h2>
                  <h2>
                    <span className="text-gray-600 font-semibold">Rol: </span>
                    <span className="text-gray-500">Firmă</span>
                  </h2>
                  <h2>
                    <span className="text-gray-600 font-semibold">
                      Adresă:{" "}
                    </span>{" "}
                    <span className="text-gray-500">{`Str. ${firma.utilizator.strada}, Nr. ${firma.utilizator.numar}, ${firma.utilizator.localitate}, Constanța`}</span>
                  </h2>
                  <h2>
                    <span className="text-gray-600 font-semibold">Email: </span>{" "}
                    <span className="text-gray-500">{`${firma.utilizator.email}`}</span>
                  </h2>
                </div>
              )}
            </section>
            <Divider />
            <div className="flex flex-col">
              <section className="flex flex-col gap-3 mb-2">
                <form
                  id="formDate"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex gap-3">
                  <DatePicker
                    minDate={dayjs()}
                    className="w-1/2"
                    slotProps={{
                      textField: {
                        ...register("data_inceput"),
                        size: "small",
                        color: "success",
                        error: Boolean(errors.data_inceput),
                        helperText: errors.data_inceput?.message,
                      },
                    }}
                    label="Dată început"
                    onChange={handleDataInceput}
                    disablePast
                  />
                  <DatePicker
                    disabled={dataInceput === null}
                    minDate={dataInceput!}
                    className="w-1/2"
                    slotProps={{
                      textField: {
                        ...register("data_sfarsit"),
                        size: "small",
                        color: "success",
                        error: Boolean(errors.data_sfarsit),
                        helperText: errors.data_sfarsit?.message,
                      },
                    }}
                    label="Dată sfârșit"
                    onChange={handleDataSfarsit}
                    disablePast
                  />
                </form>
                {dataInceput &&
                  dataSfarsit &&
                  dataSfarsit.isBefore(dataInceput) && (
                    <MesajEroare mesaj="Intervalul calendaristic este eronat" />
                  )}
              </section>
              <section className="mt-3 mb-3">
                {Object.entries(perioade).map(([tipPret, durata]) => {
                  const pret = preturi.find(
                    (pret) => pret.denumire_tip_pret === tipPret
                  );
                  if (pret && durata > 0) {
                    return (
                      <div className="flex justify-between" key={tipPret}>
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
                {pretCuTVA > 0 && (
                  <>
                    <div className="flex justify-between">
                      <h3 className="text-gray-500">&#8226; Taxă platformă:</h3>
                      <h4>
                        <span className="text-sm font-bold text-gray-600">
                          {Math.floor(pretTotal - pretFaraTaxa)}
                        </span>{" "}
                        <span className="text-sm text-green-700">RON</span>
                      </h4>
                    </div>
                    <div className="flex justify-between">
                      <h3 className="text-gray-500">&#8226; TVA (19%):</h3>
                      <h4>
                        <span className="text-sm font-bold text-gray-600">
                          {Math.floor(pretCuTVA - pretTotal)}
                        </span>{" "}
                        <span className="text-sm text-green-700">RON</span>
                      </h4>
                    </div>
                  </>
                )}
              </section>
              <Divider />
              <section className="flex justify-end">
                <h2 className="mt-2">
                  <span className="text-gray-500">Preț total:</span>{" "}
                  <span className="font-bold text-gray-600">
                    {Math.floor(pretCuTVA)}
                  </span>{" "}
                  <span className="font-bold text-green-700">RON</span>
                </h2>
              </section>
            </div>
          </CardContent>
          <CardActions className="m-2">
            <ButonSubmit
              tailwind="w-full"
              size="small"
              form="formDate"
              text="Închiriere"
              disabled={pretTotal === 0 || dataSfarsit?.isBefore(dataInceput)}
            />
          </CardActions>
        </Card>
      )}
    </LocalizationProvider>
  );
};

export default ContainerPreturi;
