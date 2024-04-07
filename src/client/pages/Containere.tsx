import { useEffect, useState } from "react";
import ContainerInchiriat from "../componente/Carduri/ContainerInchiriat";
import { ContainerInchiriere } from "../../interfaces/Interfete_Container";
import Info from "../componente/Info/Info";
import ButonSubmit from "../componente/Butoane/ButonSubmit";

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
    <main className="mt-10">
      {/* <div className="flex flex-wrap items-center gap-12 xs:flex-col md:flex-row">
        {containereInchiriere.map((container) => (
          <ContainerInchiriat key={container.id_container} props={container} />
        ))}
      </div> */}
    </main>
  );
}
