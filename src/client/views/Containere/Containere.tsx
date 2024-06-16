import { useEffect, useState } from "react";
import ContainerDepozitare from "./Componente/ContainerDepozitare.js";
import ContainerReciclareDeseuri from "./Componente/ContainerReciclareDeseuri.js";
import ContainerMateriale from "./Componente/ContainerMateriale.js";
import Loading from "../Loading.js";
import ToggleContainerPersoana from "./Componente/ToggleContainerPersoana.js";
import ToggleContainerFirma from "./Componente/ToggleContainerFirma.js";
import { ContainerInchiriere } from "../Container/ArataContainer/Depozitare/Interfete.js";
import { ContainerReciclare } from "../Container/ArataContainer/Reciclare/Interfete.js";
import { ContainerMaterialeConstructii } from "../Container/ArataContainer/Constructii/Interfete.js";

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

  const [tipContainerFirma, setTipContainerFirma] = useState<number>(0);
  const [tipContainerPersoana, setTipContainerPersoana] = useState<number>(1);
  const [esteFirma, setEsteFirma] = useState<boolean>(true);
  const [esteAdmin, setEsteAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    async function verificarePersoana() {
      try {
        const raspunsEstePersoana = await fetch(
          "http://localhost:3000/api/utilizatori/getUtilizator"
        );
        const utilizator = await raspunsEstePersoana.json();
        if (utilizator.mesaj === "Persoana") {
          setEsteFirma(false);
          setLoading(false);
        }
        setLoading(false);
      } catch (eroare) {
        console.log(eroare);
      }
    }
    verificarePersoana();
  }, []);

  useEffect(() => {
    async function verificareAdministrator() {
      try {
        const raspunsEsteAdministrator = await fetch(
          process.env.API_BASE + `/api/utilizatori/esteAdmin`
        );
        if (raspunsEsteAdministrator.status === 200) {
          setEsteAdmin(true);
        } else {
          setEsteAdmin(false);
        }
      } catch (eroare) {
        console.log(eroare);
      }
    }
    verificareAdministrator();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {esteAdmin || esteFirma ? (
        <main className="min-w-screen min-h-screen flex justify-center p-10">
          <div className="w-3/4 bg-[#f8f9fa] flex justify-center">
            <section className="w-full flex-col items-center shadow-sm md:flex">
              <div className="w-full flex justify-center">
                <ToggleContainerFirma setTipContainer={setTipContainerFirma} />
              </div>
              <div className="w-full xl:pl-14 xs:pl-4">
                <div className="w-auto flex justify-start mt-10 gap-5 flex-wrap">
                  {tipContainerFirma === 0 &&
                    containere.containereReciclare.map((container) => (
                      <ContainerReciclareDeseuri
                        key={container.id_container}
                        props={container}
                      />
                    ))}
                  {tipContainerFirma === 1 &&
                    containere.containereInchiriere.map((container) => (
                      <ContainerDepozitare
                        key={container.id_container}
                        props={container}
                      />
                    ))}
                  {tipContainerFirma === 2 &&
                    containere.containereMaterialeConstructii.map(
                      (container) => (
                        <ContainerMateriale
                          key={container.id_container}
                          props={container}
                        />
                      )
                    )}
                </div>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="min-w-screen min-h-screen flex justify-center">
          <div className="container w-4/5 bg-[#f8f9fa] flex-col shadow-sm xs:flex-col md:flex-row p-10">
            <div className="w-full flex justify-center">
              <ToggleContainerPersoana
                setTipContainer={setTipContainerPersoana}
              />
            </div>
            <div className="w-full flex self-start mt-10 gap-5">
              {tipContainerPersoana === 1 &&
                containere.containereInchiriere.map((container) => (
                  <ContainerDepozitare
                    key={container.id_container}
                    props={container}
                  />
                ))}
              {tipContainerPersoana === 2 &&
                containere.containereMaterialeConstructii.map((container) => (
                  <ContainerMateriale
                    key={container.id_container}
                    props={container}
                  />
                ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
