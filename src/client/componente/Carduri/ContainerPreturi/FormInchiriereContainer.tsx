import { Card, CardActions, CardContent, Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import ButonSubmit from "../../Butoane/ButonSubmit.js";
import Eroare from "../../../views/Eroare.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "../../Titluri/Header.js";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ContainerPreturiProps,
  FormInchiriere,
  Perioade,
} from "./Interfete.js";
import { InterfataNotificare } from "../../Erori/Notificare/Interfete.js";
import { Localitate } from "@prisma/client";

import React from "react";
import {
  ContextFirmaCurenta,
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
} from "../../Erori/RutaProtejata.js";
import Notificare from "../../Erori/Notificare/Notificare.js";
import { calculeazaPretTotal, checkDisabledDatesInRange } from "./Functii.js";
import DescriereUtilizator from "./Componente/DescriereUtilizator.js";
import IntervalCalendaristic from "./Componente/IntervalCalendaristic.js";
import DescrierePreturi from "./Componente/DescrierePreturi.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";

dayjs.extend(isSameOrAfter);

const FormInchiriereContainer = ({
  id_container,
  id_utilizator,
  preturi,
  tip,
}: ContainerPreturiProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInchiriere>();

  const [dataInceput, setDataInceput] = React.useState<Dayjs | null>(null);
  const [dataSfarsit, setDataSfarsit] = React.useState<Dayjs | null>(null);
  const [pretFaraTaxa, setPretFaraTaxa] = React.useState<number>(0);
  const pretTotal = pretFaraTaxa * 1.04;
  const pretCuTVA = pretTotal * 1.19;
  const [perioade, setPerioade] = React.useState<Perioade>({});
  const { persoanaCurenta } = React.useContext(ContextPersoanaCurenta);
  const { firmaCurenta } = React.useContext(ContextFirmaCurenta);
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [dezactiveazaButon, setDezactiveazaButon] =
    React.useState<boolean>(false);
  const [zileIndisponibile, setZileIndisponibile] = React.useState<Dayjs[]>([]);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  if (id_container === undefined) {
    return <Eroare />;
  }

  React.useEffect(() => {
    const fetchZileIndisponibile = async () => {
      try {
        let api: string | undefined;
        if (tip === "reciclare") {
          api = process.env.API_CONTAINER_RECICLARE;
        } else if (tip === "depozitare") {
          api = process.env.API_CONTAINER_DEPOZITARE;
        } else if (tip === "materiale") {
          api = process.env.API_CONTAINER_MATERIALE;
        } else {
          api = "";
        }

        if (!api) {
          setNotificare({
            open: true,
            mesaj:
              "API-ul de verificare a perioadelor indisponibile nu funcționează",
            tip: "eroare",
          });
        }

        const raspuns = await fetch(api + `/${id_container}/inchirieri`);
        if (!raspuns.ok) {
          const raspunsServer = await raspuns.json();
          console.log(raspunsServer);
          setNotificare({
            open: true,
            mesaj:
              "Perioadele indisponibile nu au putut fi obținute de la server",
            tip: "eroare",
          });
        }
        const date = await raspuns.json();
        if (date.length === 0) {
          return;
        }
        const zileOcupate: Dayjs[] = [];
        date.forEach((data: string) => zileOcupate.push(dayjs(data)));
        setZileIndisponibile(zileOcupate);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj:
            "Perioadele indisponibile nu au putut fi obținute de la server",
          tip: "eroare",
        });
        console.log((eroare as Error).message);
      }
    };

    fetchZileIndisponibile();
  }, []);

  React.useEffect(() => {
    if (dataInceput && dataSfarsit) {
      if (!dataSfarsit.isSameOrAfter(dataInceput)) {
        setNotificare({
          open: true,
          mesaj: "Intervalul calendaristic este eronat",
          tip: "eroare",
        });
        setDezactiveazaButon(true);
        setPerioade({});
        setPretFaraTaxa(0);
      } else if (
        checkDisabledDatesInRange(dataInceput, dataSfarsit, zileIndisponibile)
      ) {
        setNotificare({
          open: true,
          mesaj: "Containerul este deja închiriat în perioada specificată!",
          tip: "eroare",
        });
        setDezactiveazaButon(true);
        setPerioade({});
        setPretFaraTaxa(0);
      } else {
        calculeazaPretTotal(
          dataInceput,
          dataSfarsit,
          preturi,
          setPretFaraTaxa,
          setPerioade
        );
        setDezactiveazaButon(false);
      }
    }
  }, [dataInceput, dataSfarsit]);

  const onSubmit: SubmitHandler<FormInchiriere> = async (
    formData: FormInchiriere
  ) => {
    let data = {};
    if (firmaCurenta) {
      data = {
        data_inceput: dayjs(formData.data_inceput).format("MM-DD-YYYY"),
        data_sfarsit: dayjs(formData.data_sfarsit).format("MM-DD-YYYY"),
        id_utilizator: firmaCurenta.id_utilizator,
        id_container: id_container,
        tip_container: tip,
      };
    }
    if (persoanaCurenta) {
      data = {
        data_inceput: dayjs(formData.data_inceput).format("MM-DD-YYYY"),
        data_sfarsit: dayjs(formData.data_sfarsit).format("MM-DD-YYYY"),
        id_utilizator: persoanaCurenta.id_utilizator,
        id_container: id_container,
        tip_container: tip,
      };
    }
    const api = process.env.API_PLATA;
    if (!api) {
      throw new Error("API-ul nu este definit");
    }
    try {
      const raspuns = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!raspuns.ok) {
        const data = await raspuns.json();
        console.log("Au existat probleme la comunicarea cu Stripe", data);
      }
      const raspunsStripe = await raspuns.json();
      if (raspunsStripe.url) {
        window.location = raspunsStripe.url;
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Cererea nu a putut fi trimisă către server",
        tip: "eroare",
      });
    }
  };

  if (id_utilizator === undefined) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {!(firmaCurenta && firmaCurenta.id_utilizator === id_utilizator) && (
        <Card
          className="w-full flex flex-col justify-center h-auto bg-[#FCFCFB]"
          elevation={0}>
          <CardContent
            className="w-full flex flex-col gap-3"
            sx={{
              paddingTop: 2,
              paddingLeft: 2,
              paddingRight: 2,
              paddingBottom: 0,
            }}>
            <Header mesaj="Închiriere container" />
            <DescriereUtilizator
              utilizatorCurent={utilizatorCurent}
              persoanaCurenta={persoanaCurenta}
              firmaCurenta={firmaCurenta}
            />
            <Divider />
            <div className="flex flex-col">
              <IntervalCalendaristic
                setDataInceput={setDataInceput}
                setDataSfarsit={setDataSfarsit}
                setValue={setValue}
                disabledDates={zileIndisponibile}
                dataInceput={dataInceput}
                errors={errors}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
              <DescrierePreturi
                preturi={preturi}
                perioade={perioade}
                pretCuTVA={pretCuTVA}
                pretTotal={pretTotal}
                pretFaraTaxa={pretFaraTaxa}
              />
            </div>
          </CardContent>
          <CardActions className="m-2">
            <ButonSubmit
              tailwind="w-full"
              size="small"
              form="formDate"
              text={"Spre plată"}
              disabled={pretTotal === 0 || dezactiveazaButon}
            />
          </CardActions>
          <Notificare notificare={notificare} setNotificare={setNotificare} />
        </Card>
      )}
    </LocalizationProvider>
  );
};

export default FormInchiriereContainer;
