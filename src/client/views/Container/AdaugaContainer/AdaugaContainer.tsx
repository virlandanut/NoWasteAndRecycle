import { Paper } from "@mui/material";
import { useState } from "react";
import ToggleContainer from "../../Containere/Componente/ToggleContainerFirma.js";
import FormContainerReciclare from "./Componente/Formuri/FormContainerReciclare/FormContainerReciclare.js";
import FormContainerInchiriere from "./Componente/Formuri/FormContainerInchiriere.js";
import FormContainerConstructii from "./Componente/Formuri/FormContainerConstructii.js";

const AdaugaContainer = () => {
  const [tipContainer, setTipContainer] = useState<number>(0);

  return (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="container w-4/5 bg-[#f8f9fa] flex justify-center gap-12 shadow-sm xs:flex-col md:flex-row p-10">
        <Paper className="w-full flex flex-col items-center gap-10 p-10">
          <ToggleContainer setTipContainer={setTipContainer} />

          {tipContainer === 0 && <FormContainerReciclare />}
          {tipContainer === 1 && <FormContainerInchiriere />}
          {tipContainer === 2 && <FormContainerConstructii />}
        </Paper>
      </div>
    </main>
  );
};

export default AdaugaContainer;
