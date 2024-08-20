import { Outlet } from "react-router-dom";
import React from "react";
import { ContextFirmaCurenta } from "./RutaProtejata.js";
import Eroare from "../../views/Eroare.js";

const RutaFirma = () => {
  const { firmaCurenta, setFirmaCurenta } = React.useContext(ContextFirmaCurenta)

  if (firmaCurenta && firmaCurenta.status_aprobare) {
    return <Outlet />
  } else {
    return <Eroare codEroare={403} mesaj="Nu aveți drepturi de accesare pentru această rută!" />
  }

};

export default RutaFirma;
