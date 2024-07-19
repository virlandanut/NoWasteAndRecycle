import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ContextUtilizatorCurent } from "./RutaProtejata";
import React from "react";
import { Utilizator } from "@prisma/client";
import Eroare from "../../views/Eroare";

const RutaAdministrator = () => {
  const navigate = useNavigate();
  const { utilizatorCurent, setUtilizatorCurent } = React.useContext(ContextUtilizatorCurent);

  useEffect(() => {
    if (!utilizatorCurent) {
      navigate("/login", { replace: true })
      return;
    }
  }, [utilizatorCurent, navigate]);

  if (utilizatorCurent && utilizatorCurent.rol === "ADMINISTRATOR") {
    return <Outlet />;
  } else {
    return <Eroare codEroare={403} mesaj="Nu aveți drepturi de accesare pentru această rută!" />
  }
};

export default RutaAdministrator;
