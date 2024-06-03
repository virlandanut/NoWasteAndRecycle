import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TichetRaportare } from "../../../../server/Routes/Raportare/Interfete";
import Eroare from "../../Eroare";

interface EroareRaportShow {
  eroare: number;
  mesaj: string;
}

const RaportShow = () => {
  const { id } = useParams();
  const [raport, setRaport] = useState<TichetRaportare>();
  const [eroare, setEroare] = useState<EroareRaportShow>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspuns = await fetch(process.env.API_BASE + `/api/raport/${id}`);
        if (!raspuns.ok) {
          if (raspuns.status === 404) {
            setEroare({ eroare: 404, mesaj: "Raportul nu a fost găsit!" });
          }
          setEroare({
            eroare: 400,
            mesaj: "Raportul nu a fost trimis de către server!",
          });
        }
        const data: TichetRaportare = await raspuns.json();
        setRaport(data);
      } catch (eroare) {
        console.log("Eroare fetch data în componenta RaportShow: ", eroare);
        setEroare({
          eroare: 400,
          mesaj:
            "Au existat probleme la interogarea raportului din baza de date!",
        });
      }
    };
    fetchData();
  }, [id]);
  if (eroare) {
    return <Eroare codEroare={eroare.eroare} mesaj={eroare.mesaj} />;
  }
  return (
    raport && (
      <main className="min-w-screen min-h-screen flex justify-center">
        <div className="w-4/5 p-10">
          <section>
            
          </section>
        </div>
      </main>
    )
  );
};

export default RaportShow;
