import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface tipUtilizator {
  estePersoana: boolean;
}

interface VerificarePersoanaContextProps {
  children: ReactNode;
}

export const ToggleContainereContext = createContext<tipUtilizator | undefined>(
  undefined
);

export default function VerificarePersoanaContext({
  children,
}: VerificarePersoanaContextProps) {
  const [estePersoana, setEstePersoana] = useState<boolean>(false);

  useEffect(() => {
    async function verificarePersoana() {
      try {
        const raspunsEstePersoana = await fetch(
          "http://localhost:3000/api/utilizatori/getUtilizator"
        );
        const utilizator = await raspunsEstePersoana.json();
        if (utilizator.mesaj === "Persoana") {
          setEstePersoana(true);
        }
      } catch (eroare) {
        console.log(eroare);
      }
    }
    verificarePersoana();
  }, []);

  return (
    <ToggleContainereContext.Provider value={{ estePersoana }}>
      {children}
    </ToggleContainereContext.Provider>
  );
}

export function useToggleContainerContext() {
  const verificarePersoana = useContext(ToggleContainereContext);
  if (verificarePersoana === undefined) {
    throw new Error(
      "Contextul de toggle containere trebuie folosit cu un context pentru toggle containere"
    );
  }

  return verificarePersoana;
}
