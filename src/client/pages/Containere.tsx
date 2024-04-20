import { useEffect, useState } from "react";
import {
  ContainerInchiriere,
  ContainerMaterialeConstructii,
  ContainerReciclare,
} from "../../interfaces/Interfete_Container";
import ToggleContainer from "../componente/Toggle/ToggleContainer";
import ContainerDepozitare from "../componente/Carduri/ContainerDepozitare";
import ContainerReciclareDeseuri from "../componente/Carduri/ContainerReciclareDeseuri";
import ContainerMateriale from "../componente/Carduri/ContainerMateriale";

interface StateContainere {
  containereInchiriere: ContainerInchiriere[];
  containereReciclare: ContainerReciclare[];
  containereMaterialeConstructii: ContainerMaterialeConstructii[];
}

export default function Containere() {
  const [containere, setContainere] = useState<StateContainere>({
    containereInchiriere: [],
    containereReciclare: [],
    containereMaterialeConstructii: [],
  });

  const [tipContainer, setTipContainer] = useState<number>(0);

  useEffect(() => {
    const getContainere = async () => {
      try {
        let raspuns = await fetch(process.env.API_BASE + "/api/containere");
        if (!raspuns.ok) {
          throw new Error("Containerele nu au fost trimise de către server");
        }
        const data = await raspuns.json();
        setContainere(data);
      } catch (eroare) {
        throw new Error("Nu există o conexiune activă cu server-ul");
      }
    };
    getContainere();
  }, []);

  return (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="container w-4/5 bg-[#f8f9fa] flex-col shadow-sm xs:flex-col md:flex-row p-10">
        <div className="w-full flex justify-center">
          <ToggleContainer setTipContainer={setTipContainer} />
        </div>
        <div className="w-full flex self-start mt-10 gap-5">
          {tipContainer === 0 &&
            containere.containereReciclare.map((container) => (
              <ContainerReciclareDeseuri
                key={container.id_container}
                props={container}
              />
            ))}
          {tipContainer === 1 &&
            containere.containereInchiriere.map((container) => (
              <ContainerDepozitare
                key={container.id_container}
                props={container}
              />
            ))}
          {tipContainer === 2 &&
            containere.containereMaterialeConstructii.map((container) => (
              <ContainerMateriale
                key={container.id_container}
                props={container}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
