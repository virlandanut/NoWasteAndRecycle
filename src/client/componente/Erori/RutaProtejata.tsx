import { Firma, Persoana_fizica, Utilizator } from "@prisma/client";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ContextUtilizatorCurent = React.createContext<{ utilizatorCurent: Utilizator | null, setUtilizatorCurent: React.Dispatch<React.SetStateAction<Utilizator | null>> }>({ utilizatorCurent: null, setUtilizatorCurent: () => { } });
export const ContextPersoanaCurenta = React.createContext<{ persoanaCurenta: Persoana_fizica | null, setPersoanaCurenta: React.Dispatch<React.SetStateAction<Persoana_fizica | null>> }>({ persoanaCurenta: null, setPersoanaCurenta: () => { } });
export const ContextFirmaCurenta = React.createContext<{ firmaCurenta: Firma | null, setFirmaCurenta: React.Dispatch<React.SetStateAction<Firma | null>> }>({ firmaCurenta: null, setFirmaCurenta: () => { } });

export default function RutaProtejata() {
  const navigate = useNavigate();
  const [utilizatorCurent, setUtilizatorCurent] = React.useState<Utilizator | null>(null);
  const [persoanaCurenta, setPersoanaCurenta] = React.useState<Persoana_fizica | null>(null);
  const [firmaCurenta, setFirmaCurenta] = React.useState<Firma | null>(null);

  React.useEffect(() => {
    const verificaAutentificare = async () => {
      const api = process.env.API_GET_UTILIZATOR_CURENT;
      if (!api) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const rezultat = await fetch(api);
        if (!rezultat.ok) {
          navigate("/login", { replace: true });
          return;
        }
        const utilizator: Utilizator = await rezultat.json();
        setUtilizatorCurent(utilizator);
      } catch (eroare) {
        navigate("/login", { replace: true });
        return;
      }
    };
    verificaAutentificare();
  }, [navigate]);

  React.useEffect(() => {
    const fetchPersoanaCurenta = async (id: number) => {
      const apiPersoana = process.env.API_GET_PERSOANA_CURENTA;
      if (!apiPersoana) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const raspuns = await fetch(`${apiPersoana}${id}`);
        if (!raspuns.ok) {
          navigate("/login", { replace: true });
          return;
        }
        const persoana: Persoana_fizica = await raspuns.json();
        setPersoanaCurenta(persoana);
      } catch (eroare) {
        navigate("/login", { replace: true });
        return;
      }

    }

    const fetchFirmaCurenta = async (id: number) => {
      const apiFirma = process.env.API_GET_FIRMA_CURENTA;
      if (!apiFirma) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const raspuns = await fetch(`${apiFirma}${id}`);
        if (!raspuns.ok) {
          navigate("/login", { replace: true });
          return;
        }
        const firma: Firma = await raspuns.json();
        setFirmaCurenta(firma);
      } catch (eroare) {
        navigate("/login", { replace: true });
        return;
      }
    }

    if (utilizatorCurent) {
      if (utilizatorCurent.rol === "FIRMA") {
        fetchFirmaCurenta(utilizatorCurent.id_utilizator);
      } else {
        fetchPersoanaCurenta(utilizatorCurent.id_utilizator);
      }
    }

  }, [utilizatorCurent, navigate]);

  if (utilizatorCurent) {
    return (
      <ContextUtilizatorCurent.Provider value={{ utilizatorCurent, setUtilizatorCurent }}>
        <ContextFirmaCurenta.Provider value={{ firmaCurenta, setFirmaCurenta }}>
          <ContextPersoanaCurenta.Provider value={{ persoanaCurenta, setPersoanaCurenta }}>
            <Outlet />
          </ContextPersoanaCurenta.Provider>
        </ContextFirmaCurenta.Provider>
      </ContextUtilizatorCurent.Provider>
    );
  }
}
