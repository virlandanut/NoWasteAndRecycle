import { Paper } from "@mui/material";
import FormSelectieContainer from "./Componente/FormSelectieContainer/FormSelectieContainer.js";
import HartaPrincipala from "./Componente/HartaPrincipala/HartaPrincipala.js";
import { IContainerOptim, ICoordonate } from "./Interfete.js";
import React from "react";
import DescriereContainer from "./Componente/DescriereContainer/DescriereContainer.js";
import { ContextUtilizatorCurent } from "../../componente/Erori/RutaProtejata.js";

export default function Navigare() {
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [container, setContainer] = React.useState<IContainerOptim | null>(
    null
  );

  console.log(container);
  return (
    <main className="min-w-screen min-h-screen flex justify-center">
      <Paper
        elevation={0}
        className="container w-full bg-[#f8f9fa] flex justify-start p-10 ">
        <section className="w-full flex gap-4">
          <div className="w-1/3 flex flex-col items-center gap-5">
            <FormSelectieContainer
              utilizatorCurent={utilizatorCurent}
              setContainer={setContainer}
            />
            <DescriereContainer container={container} />
          </div>
          <div className="w-2/3">
            <HartaPrincipala
              utilizatorCurent={utilizatorCurent}
              coordonate={{
                latitudine: container?.container.lat!,
                longitudine: container?.container.long!,
              }}
            />
          </div>
        </section>
      </Paper>
    </main>
  );
}
