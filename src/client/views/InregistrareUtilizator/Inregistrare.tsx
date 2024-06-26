import "./Inregistrare.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Paper } from "@mui/material";
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
    <main className="flex justify-center items-center min-h-screen w-screen">
      <Paper className="flex xl:flex-row xl:w-[1000px] lg:flex-row lg:w-[800px] md:w-[350px] md:flex-col xs:w-[250px] xs:flex-col">
        <Link
          className={`w-full ${secondSelected ? "grayscale z-0" : "z-10"}`}
          to={"/register/persoana"}
          onMouseEnter={handleHoverFirst}
          onMouseLeave={handleHoverLeave}>
          <div className="flex flex-col items-center h-full bg-emerald-700 overflow-hidden cursor-pointer border-4 border-solid p-7 md:pb-0 md:pt-3 xs:pt-3 xs:pb-0 border-transparent transition-all duration-500 hover:border-white hover:scale-105 hover:bg-emerald-600 md:hover:border-2 xs:hover:border-2">
            <h1 className="text-white lg:text-2xl uppercase font-bold md:text-xl mt-5 md:mt-0 xs:text-sm xs:mt-0">
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
          <div className="flex flex-col items-center h-full gap-4 bg-cyan-800 cursor-pointer overflow-hidden border-4 border-solid border-transparent trasnition-all duration-500 xs:gap-0 hover:border-white hover:scale-105 hover:bg-cyan-700 md:hover:border-2 xs:hover:border-2">
            <h1 className="text-white lg:text-2xl uppercase font-bold xl:mt-4 lg:mt-6 md:text-xl md:mt-4 xs:text-sm xs:mt-2">
              Persoană juridică
            </h1>{" "}
            <img className="md:mt-6 xs:mt-1 w-5/6" src="/firma.svg" alt="" />
          </div>
        </Link>
      </Paper>
    </main>
  );
}
