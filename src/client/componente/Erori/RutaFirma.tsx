import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../views/Loading.js";
import Eroare from "../../views/Eroare.js";

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
          navigate("/eroare", { replace: true });
        }
        setConfirmareFirma(true);
      } catch (eroare) {
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
    return <Eroare codEroare={403} mesaj="Neautorizat" />;
  }
};

export default RutaFirma;
