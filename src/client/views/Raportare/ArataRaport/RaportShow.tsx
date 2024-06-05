import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TichetRaportare } from "../../../../server/Routes/Raportare/Interfete";
import Eroare from "../../Eroare";
import { format, parseISO } from "date-fns";
import { Divider } from "@mui/material";
import AdaugaComentariu from "./Componente/AdaugaComentariu/AdaugaComentariu";
import ArataComentarii from "./Componente/ArataComentarii/ArataComentarii";

interface TichetRaport {
  tichet: TichetRaportare;
  nume: string;
  rol: string;
}

interface EroareRaportShow {
  eroare: number;
  mesaj: string;
}

const RaportShow = () => {
  const { id } = useParams();
  const [raport, setRaport] = useState<TichetRaport>();
  const [eroare, setEroare] = useState<EroareRaportShow>();
  const navigate = useNavigate();
  const [randeazaDinNou, setRandeazaDinNou] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspuns = await fetch(process.env.API_BASE + `/api/raport/${id}`);
        if (!raspuns.ok) {
          if (raspuns.status === 404) {
            setEroare({ eroare: 404, mesaj: "Raportul nu a fost găsit!" });
          } else if (raspuns.status === 403) {
            setEroare({
              eroare: 403,
              mesaj: "Nu aveți dreptul să accesați această pagină",
            });
            navigate(-1);
          } else {
            setEroare({
              eroare: 400,
              mesaj: "Raportul nu a fost trimis de către server!",
            });
          }
        }
        const data: TichetRaport = await raspuns.json();
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

  const formatData = (data: string) => {
    const parsareISO = parseISO(data);
    const dataFormatata = format(parsareISO, "dd.MM.yyyy");

    return dataFormatata;
  };
  return (
    raport && (
      <main className="min-w-screen min-h-screen flex justify-center">
        <div className="w-2/3 p-10 flex">
          <section className="flex flex-col gap-8 w-1/5">
            <div className="flex flex-col gap-1">
              <h1 className="uppercase font-bold text-base text-gray-400">
                Id tichet
              </h1>
              <h2 className="font-semibold text-gray-500">
                {`#${raport.tichet.id_raport_problema}`}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="uppercase font-bold text-gray-400">
                Dată trimitere
              </h1>
              <h2 className="font-semibold text-gray-500">
                {formatData(raport.tichet.data.toString())}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="uppercase font-bold text-gray-400">Status</h1>
              {raport.tichet.status === 0 ? (
                <h2 className="uppercase font-semibold text-red-500">
                  Nerezolvat
                </h2>
              ) : (
                <h2 className="uppercase font-semibold text-green-600">
                  Rezolvat
                </h2>
              )}
            </div>
          </section>
          <div className="w-4/5 flex flex-col gap-6">
            <section>
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold">{raport.tichet.titlu}</h1>
                <p className="text-gray-500 text-sm">{raport.tichet.mesaj}</p>
                <Divider />
              </div>
            </section>
            <section>
              <ArataComentarii
                id_raportare_problema={raport.tichet.id_raport_problema}
                id_proprietar={raport.tichet.utilizator}
                reRandeaza={randeazaDinNou}
              />
            </section>
            <Divider />
            <section>
              <AdaugaComentariu
                id_raport_problema={raport.tichet.id_raport_problema}
                setRandeazaDinNou={() => setRandeazaDinNou(!randeazaDinNou)}
              />
            </section>
          </div>
        </div>
      </main>
    )
  );
};

export default RaportShow;
