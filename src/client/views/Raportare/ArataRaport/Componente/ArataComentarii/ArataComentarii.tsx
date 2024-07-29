import { useContext, useEffect, useState } from "react";
import { ComentariuTichet } from "../../../../../../server/Routes/Raportare/Interfete";
import Loading from "../../../../Loading";
import ComentariuAdministrator from "./Componente/ComentariuAdministrator";
import ComentariuProprietarTichet from "./Componente/ComentariuProprietarTichet";
import React from "react";
import { ContextUtilizatorCurent } from "../../../../../componente/Erori/RutaProtejata";
import { Utilizator } from "@prisma/client";

interface ArataComentariiProps {
  id_raportare_problema: number;
  id_proprietar: number;
  reRandeaza: boolean;
  id_utilizator_curent: number;
}
const ArataComentarii = ({
  id_raportare_problema,
  id_proprietar,
  reRandeaza,
  id_utilizator_curent,
}: ArataComentariiProps) => {
  const [comentarii, setComentarii] = React.useState<ComentariuTichet[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getComentarii = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE +
            `/api/raport/${id_raportare_problema}/comentarii`
        );
        if (raspuns.ok) {
          const cometariiTichet: ComentariuTichet[] = await raspuns.json();
          setComentarii(cometariiTichet);
          setLoading(false);
        }
      } catch (eroare) {
        console.log(
          `Comentariile tichetului #${id_raportare_problema} nu au fost primite de la server:`,
          eroare
        );
      }
    };
    getComentarii();
  }, [id_raportare_problema, reRandeaza]);

  if (loading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {comentarii.length > 0 && id_utilizator_curent ? (
        <section className="w-full flex flex-col gap-10">
          {comentarii.map((comentariu: ComentariuTichet) => {
            if (id_utilizator_curent !== id_proprietar) {
              if (comentariu.rol === "ADMINISTRATOR") {
                return (
                  <ComentariuAdministrator
                    key={comentariu.id_comentariu}
                    comentariu={comentariu}
                  />
                );
              } else {
                return (
                  <ComentariuProprietarTichet
                    key={comentariu.id_comentariu}
                    comentariu={comentariu}
                    selfEnd={false}
                  />
                );
              }
            } else {
              if (comentariu.rol === "ADMINISTRATOR") {
                return (
                  <ComentariuAdministrator
                    key={comentariu.id_comentariu}
                    comentariu={comentariu}
                    selfEnd={false}
                  />
                );
              } else {
                return (
                  <ComentariuProprietarTichet
                    key={comentariu.id_comentariu}
                    comentariu={comentariu}
                  />
                );
              }
            }
          })}
        </section>
      ) : (
        <section className="w-full flex justify-center mt-10 mb-10">
          <div className="w-1/2 flex flex-col items-center gap-4">
            <img className="w-1/2" src="/404.svg" alt="" />
            <p className="text-sm text-gray-500">
              Deocamdată nu există comentarii la acest tichet.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ArataComentarii;
