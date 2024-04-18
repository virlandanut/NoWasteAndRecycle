import { useEffect, useState } from "react";
import ContainerInchiriat from "../componente/Carduri/ContainerInchiriat";
import { ContainerInchiriere } from "../../interfaces/Interfete_Container";
import ToggleContainer from "../componente/Toggle/ToggleContainer";

export default function Containere() {
  const [containereInchiriere, setContainereInchiriere] = useState<
    ContainerInchiriere[]
  >([]);
  const [tipContainer, setTipContainer] = useState<number>(0);

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
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="container w-4/5 bg-[#f8f9fa] flex-col shadow-sm xs:flex-col md:flex-row p-10">
        <div className="w-full flex justify-center">
          <ToggleContainer setTipContainer={setTipContainer} />
        </div>
        <div className="w-full flex self-start mt-10 gap-5">
          {tipContainer === 0 && "Inca nimic frate aici... container reciclare"}
          {tipContainer === 1 &&
            containereInchiriere.map((container) => (
              <ContainerInchiriat
                key={container.id_container}
                props={container}
              />
            ))}
          {tipContainer === 2 &&
            "Inca nimic frate aici... container materiale constructii"}
        </div>
      </div>
    </main>
  );
}
