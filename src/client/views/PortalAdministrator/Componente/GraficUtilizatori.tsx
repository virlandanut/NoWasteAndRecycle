import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

interface GraficUtilizatoriProps {
  numarFirme: number[];
  numarPersoane: number[];
  saptamana: string[];
}

const GraficUtilizatori = () => {
  const [metriciUtilizatori, setMetriciUtilizatori] =
    useState<GraficUtilizatoriProps>();

  useEffect(() => {
    const getMetriciUtilizatori = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + `/api/admin/portal/utilizatoriSaptamana`
        );
        if (!raspuns.ok) {
          console.log(
            "Datele metrice ale utilizatorilor nu au fost primite de la server"
          );
        }
        const data = await raspuns.json();
        setMetriciUtilizatori(data);
      } catch (eroare) {
        console.log(
          "Au existat probleme la preluarea metricilor utilizatorilor: ",
          eroare
        );
      }
    };
    getMetriciUtilizatori();
  }, []);

  return (
    metriciUtilizatori && (
      <LineChart
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
            padding: 0,
          },
        }}
        series={[
          {
            data: metriciUtilizatori.numarFirme,
            label: "Firme",
            color: "#2e7d32",
          },
          {
            data: metriciUtilizatori.numarPersoane,
            label: "Persoane",
            color: "#d32f2f",
          },
        ]}
        height={290}
        xAxis={[
          {
            data: metriciUtilizatori.saptamana,
            scaleType: "band",
          },
        ]}
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
      />
    )
  );
};

export default GraficUtilizatori;
