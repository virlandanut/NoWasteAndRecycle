import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RutaProtejataProps {
  children: React.ReactNode;
}

export default function RutaProtejata({ children }: RutaProtejataProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const verificaAutentificare = async () => {
      try {
        const rezultat = await fetch(
          "http://localhost:3000/api/utilizatori/esteLogat"
        );
        if (!rezultat.ok) {
          navigate("/login", { replace: true });
        }
      } catch (eroare) {
        console.log(eroare);
      }
    };
    verificaAutentificare();
  }, [navigate]);

  return <>{children}</>;
}
