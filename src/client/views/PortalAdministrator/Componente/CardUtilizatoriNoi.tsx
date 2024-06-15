import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { useEffect, useState } from "react";

interface MetriceUtilizator {
  utilizatoriNoi: number;
  medieUtilizatori: number;
}

const CardUtilizatoriNoi = () => {
  const [metriceUtilizatori, setMetriceUtilizatori] =
    useState<MetriceUtilizator>();

  useEffect(() => {
    const getMetriceUtilizatori = async () => {
      const raspuns = await fetch(
        process.env.API_BASE + `/api/admin/portal/utilizatori`
      );
      if (!raspuns.ok) {
        console.log(
          "Metricele utilizatorilor nu au fost trimise de către server!"
        );
      }
      const rezultat = await raspuns.json();
      setMetriceUtilizatori(rezultat);
    };

    getMetriceUtilizatori();
  }, []);

  return (
    metriceUtilizatori &&
    (metriceUtilizatori.utilizatoriNoi >=
    metriceUtilizatori.medieUtilizatori ? (
      <div className="w-1/3 bg-green-800 border rounded-lg flex flex-col justify-center gap-8 p-4">
        <div className="flex justify-between items-center pl-4 pr-4">
          <SentimentSatisfiedAltRoundedIcon
            className=" text-white"
            sx={{ fontSize: 100 }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white self-end">
              {metriceUtilizatori.utilizatoriNoi}
            </h1>
            <h2 className="text-xl text-white uppercase font-semibold self-end">
              Utilizatori noi
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-semibold text-white">
            Medie săptămâna trecută:{" "}
            {metriceUtilizatori.medieUtilizatori.toFixed(2)}
          </h3>
          <TrendingUpRoundedIcon className="text-white" sx={{ fontSize: 60 }} />
        </div>
      </div>
    ) : (
      <div className="w-1/3 bg-red-800 border rounded-lg flex flex-col justify-center gap-10 p-4">
        <div className="flex items-center justify-between mt-8 pl-4 pr-4">
          <SentimentDissatisfiedRoundedIcon
            className=" text-white"
            sx={{ fontSize: 100 }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white self-end">
              {metriceUtilizatori.utilizatoriNoi}
            </h1>
            <h2 className="text-xl text-white uppercase font-semibold self-end">
              Utilizatori noi
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-semibold text-white">
            Medie săptămâna trecută:{" "}
            {metriceUtilizatori.medieUtilizatori.toFixed(2)}
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

export default CardUtilizatoriNoi;
