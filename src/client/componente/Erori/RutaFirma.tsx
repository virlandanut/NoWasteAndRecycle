import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RutaFirmaProps = {
  children: React.ReactNode;
};

const RutaFirma = ({ children }: RutaFirmaProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verificareRolUtilizator = async () => {
      try {
        const rezultat = await fetch(
          "http://localhost:3000/api/utilizatori/rol"
        );
        if (!rezultat.ok) {
          navigate("/", { replace: true });
        }
      } catch (eroare) {
        console.log(eroare);
      }
    };
    verificareRolUtilizator();
  }, [navigate]);
  return <>{children}</>;
};

export default RutaFirma;
