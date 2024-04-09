import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RutaProtejata() {
  const navigate = useNavigate();
  const [esteAutentificat, setEsteAutentificat] = useState<boolean>(false);

  useEffect(() => {
    const verificaAutentificare = async () => {
      try {
        const rezultat = await fetch(
          "http://localhost:3000/api/utilizatori/esteLogat"
        );
        if (!rezultat.ok) {
          navigate("/login", { replace: true });
        }
        setEsteAutentificat(true);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    verificaAutentificare();
  }, [navigate]);

  if (esteAutentificat) {
    return <Outlet />;
  }
}
