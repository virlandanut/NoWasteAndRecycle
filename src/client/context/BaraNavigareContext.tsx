import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface verificareFirma {
  esteFirma: boolean;
  esteAprobata: boolean;
}

interface VerificareFirmaContextProps {
  children: ReactNode;
}
export const BaraNavigareContext = createContext<verificareFirma | undefined>(
  undefined
);

export default function VerificareFirmaContext({
  children,
}: VerificareFirmaContextProps) {
  const [esteFirma, setEsteFirma] = useState<boolean>(false);
  const [esteAprobata, setEsteAprobata] = useState<boolean>(false);

  useEffect(() => {
    async function verificareFirma() {
      const raspunsEsteFirma = await fetch(
        "http://localhost:3000/api/utilizatori/esteFirma"
      );
      if (!raspunsEsteFirma.ok) {
        setEsteFirma(false);
      }
      const statusEsteFirma = await raspunsEsteFirma.json();
      setEsteFirma(statusEsteFirma.success);
      if (statusEsteFirma.success) {
        const raspunsEsteAprobat = await fetch(
          "http://localhost:3000/api/utilizatori/esteFirmaAprobata"
        );
        if (!raspunsEsteAprobat.ok) {
          setEsteAprobata(false);
        }
        const statusAprobare = await raspunsEsteAprobat.json();
        setEsteAprobata(statusAprobare.success);
      }
    }
    verificareFirma();
  }, []);

  return (
    <BaraNavigareContext.Provider value={{ esteFirma, esteAprobata }}>
      {children}
    </BaraNavigareContext.Provider>
  );
}

export function useBaraNavigareContext() {
  const verificareFirma = useContext(BaraNavigareContext);
  if (verificareFirma === undefined) {
    throw new Error(
      "Contextul de navigare trebuie folosit cu un context pentru navigare!"
    );
  }

  return verificareFirma;
}
