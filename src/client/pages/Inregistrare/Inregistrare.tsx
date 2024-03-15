import { Paper } from "@mui/material";
import "./Inregistrare.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Inregistrare() {
  const [firstSelected, setFirstSelected] = useState(false);
  const [secondSelected, setSecondSelected] = useState(false);

  const handleHoverFirst = () => {
    setFirstSelected(true);
    setSecondSelected(false);
  };
  const handleHoverSecond = () => {
    setFirstSelected(false);
    setSecondSelected(true);
  };
  const handleHoverLeave = () => {
    setFirstSelected(false);
    setSecondSelected(false);
  };

  return (
    <Paper
      className="w-full flex xl:flex-row xl:w-[1000px] lg:flex-row lg:w-[800px] md:w-[350px] md:flex-col sm:w-[250px] sm:flex-col"
      variant="elevation"
      elevation={3}>
      <Link
        className={`w-full ${secondSelected ? "grayscale z-0" : "z-10"}`}
        to={"/register/persoana"}
        onMouseEnter={handleHoverFirst}
        onMouseLeave={handleHoverLeave}>
        <div className="flex flex-col items-center justify-center h-full bg-emerald-700 overflow-hiddencursor-pointer border-4 border-solid p-7 md:pb-0 md:pt-3 sm:pt-3 sm:pb-0 border-transparent transition-all duration-500 hover:border-white hover:scale-105 hover:bg-emerald-600 md:hover:border-2 sm:hover:border-2">
          <h1 className="text-white lg:text-2xl uppercase font-bold md:text-xl mt-5 md:mt-0 sm:text-sm sm:mt-0">
            Persoană fizică
          </h1>{" "}
          <img className="mt-6 w-1/2" src="/pf.svg" alt="" />
        </div>
      </Link>

      <Link
        className={`w-full ${firstSelected ? "grayscale z-0" : "z-10"}`}
        to={"/register/firma"}
        onMouseEnter={handleHoverSecond}
        onMouseLeave={handleHoverLeave}>
        <div className="flex flex-col items-center justify-center h-full gap-4 bg-cyan-800	cursor-pointer overflow-hidden border-4 border-solid border-transparent trasnition-all duration-500 sm:gap-0 hover:border-white hover:scale-105 hover:bg-cyan-700 md:hover:border-2 sm:hover:border-2">
          <h1 className="text-white lg:text-2xl uppercase font-bold xl:mt-4 lg:mt-6 md:text-xl md:mt-4 sm:text-sm sm:mt-2">
            Persoană juridică
          </h1>{" "}
          <img className="md:mt-6 sm:mt-1 w-5/6" src="/firma.svg" alt="" />
        </div>
      </Link>
    </Paper>
  );
}
