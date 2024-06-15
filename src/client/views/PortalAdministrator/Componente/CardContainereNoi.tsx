import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { useEffect, useState } from "react";

interface MetriceContainere {
  containereNoi: number;
  medieContainere: number;
}

const CardContainereNoi = () => {
  const [metriceContainere, setMetriceContainere] =
    useState<MetriceContainere>();

  useEffect(() => {
    const getMetriceContainere = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + `/api/admin/portal/containere`
        );
        if (!raspuns.ok) {
          console.log(
            "Metricile containerelor nu au fost trimise de către server"
          );
        }
        const rezultat = await raspuns.json();
        setMetriceContainere(rezultat);
      } catch (eroare) {
        console.log(
          "Au existat probleme la obținerea metricilor containerelor: ",
          eroare
        );
      }
    };
    getMetriceContainere();
  }, []);

  return (
    metriceContainere &&
    (metriceContainere.containereNoi > metriceContainere.medieContainere ? (
      <div className="w-1/3 bg-green-800 border rounded-lg flex flex-col justify-center gap-8 p-4">
        <div className="flex items-center justify-between pr-4 pl-4">
          <DeleteOutlineRoundedIcon
            className=" text-white"
            sx={{ fontSize: 100, margin: 0, padding: 0 }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white self-end">
              {metriceContainere.containereNoi}
            </h1>
            <h2 className="text-xl text-white uppercase font-semibold self-end">
              Containere noi
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 self-center">
          <h3 className="text-2xl font-semibold text-white">
            Medie săptămâna trecută:{" "}
            {metriceContainere.medieContainere.toFixed(2)}
          </h3>
          <TrendingUpRoundedIcon className="text-white" sx={{ fontSize: 60 }} />
        </div>
      </div>
    ) : (
      <div className="w-1/3 bg-red-800 border rounded-lg flex flex-col justify-center gap-8 p-4">
        <div className="flex items-center justify-between pr-4 pl-4">
          <DeleteOutlineRoundedIcon
            className=" text-white"
            sx={{ fontSize: 100, margin: 0, padding: 0 }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white self-end">
              {metriceContainere.containereNoi}
            </h1>
            <h2 className="text-xl text-white uppercase font-semibold self-end">
              Containere noi
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 self-center">
          <h3 className="text-2xl font-semibold text-white">
            Medie săptămâna trecută:{" "}
            {metriceContainere.medieContainere.toFixed(2)}
          </h3>
          <TrendingDownRoundedIcon
            className="text-white"
            sx={{ fontSize: 60 }}
          />
        </div>
      </div>
    ))
  );
};

export default CardContainereNoi;
