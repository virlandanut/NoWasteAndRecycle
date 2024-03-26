import { useEffect, useState } from "react";
import ContainerBody from "../componente/Containere/ContainerBody";
import ContainerInchiriat from "../componente/Carduri/ContainerInchiriat";
import { ContainerInchiriere } from "../../../interfaces";

export default function Containere() {
  const [containereInchiriere, setContainereInchiriere] = useState<
    ContainerInchiriere[]
  >([]);
  useEffect(() => {
    const getContainereInchiriere = async () => {
      try {
        let raspuns = await fetch(process.env.API_BASE + "/api/containere");
        if (!raspuns.ok) {
          throw new Error("Containerele nu a fost trimis de către server");
        }
        const data = await raspuns.json();
        setContainereInchiriere(data);
      } catch (eroare) {
        throw new Error("Nu există o conexiune activă cu server-ul");
      }
    };
    getContainereInchiriere();
  }, []);

  return (
    <ContainerBody tailwind="mt-10">
      <div className="flex flex-wrap items-center gap-12 xs:flex-col md:flex-row">
        {containereInchiriere.map((container) => (
          <ContainerInchiriat key={container.idContainer} props={container} />
        ))}
      </div>
    </ContainerBody>
  );
}
