import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading";

const RutaFirma = () => {
  const navigate = useNavigate();
  const [confirmareFirma, setConfirmareFirma] = useState<boolean | null>(null);

  useEffect(() => {
    const verificareRolUtilizator = async () => {
      try {
        const [rezultatFirma, rezultatStatusAprobare] = await Promise.all([
          fetch("http://localhost:3000/api/utilizatori/esteFirma"),
          fetch("http://localhost:3000/api/utilizatori/esteFirmaAprobata"),
        ]);

        if (!rezultatFirma.ok || !rezultatStatusAprobare.ok) {
          navigate("/", { replace: true });
          return;
        }
        setConfirmareFirma(true);
      } catch (eroare) {
        console.log(eroare);
        setConfirmareFirma(false);
      }
    };
    verificareRolUtilizator();
  }, [navigate]);

  if (confirmareFirma === null) {
    return <Loading />;
  } else if (confirmareFirma) {
    return <Outlet />;
  } else {
    return <div>Neautorizat</div>;
  }
};

export default RutaFirma;
