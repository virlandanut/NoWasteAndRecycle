import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

interface GraficContainereProps {
  numarContainereReciclare: number[];
  numarContainereDepozitareFix: number[];
  numarContainereDepozitareMobil: number[];
  saptamana: string[];
}

const GraficContainere = () => {
  const [containere, setContainere] = useState<GraficContainereProps | null>(
    null
  );

  console.log(containere);

  useEffect(() => {
    const getMetriciContainere = async () => {
      try {
        const rezultat = await fetch(
          process.env.API_BASE + `/api/admin/portal/containereSaptamana`
        );
        if (!rezultat.ok) {
          console.log(
            "Au existat probleme la obținerea metricilor containerelor din baza de date"
          );
        }
        const metriciContainere = await rezultat.json();
        setContainere(metriciContainere);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    getMetriciContainere();
  }, []);

  return (
    containere && (
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
            data: containere.numarContainereReciclare,
            label: "Reciclare",
            color: "#2e7d32",
          },
          {
            data: containere.numarContainereDepozitareFix,
            label: "Depozitare Fix",
            color: "#d32f2f",
          },
          {
            data: containere.numarContainereDepozitareMobil,
            label: "Depozitare Mobil",
            color: "#0288d1",
          },
        ]}
        height={290}
        xAxis={[
          {
            data: containere.saptamana,
            scaleType: "band",
          },
        ]}
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
      />
    )
  );
};

export default GraficContainere;
