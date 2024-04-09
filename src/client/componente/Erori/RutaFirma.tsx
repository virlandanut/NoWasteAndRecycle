import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RutaFirma = () => {
  const navigate = useNavigate();
  const [confirmareFirma, setConfirmareFirma] = useState<boolean>(false);

  useEffect(() => {
    const verificareRolUtilizator = async () => {
      try {
        const rezultat = await fetch(
          "http://localhost:3000/api/utilizatori/esteFirma"
        );
        if (!rezultat.ok) {
          navigate("/", { replace: true });
        }
        const rezultatStatusAprobare = await fetch(
          "http://localhost:3000/api/utilizatori/esteFirmaAprobata"
        );
        if (!rezultatStatusAprobare.ok) {
          navigate("/", { replace: true });
        }
        setConfirmareFirma(true);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    verificareRolUtilizator();
  }, [navigate]);

  if (confirmareFirma) {
    return <Outlet />;
  }
};

export default RutaFirma;
