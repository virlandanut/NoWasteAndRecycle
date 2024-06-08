import React from "react";
import { format, parseISO } from "date-fns";
import { TichetRaportare } from "../../../../../../server/Routes/Raportare/Interfete";

const formatData = (data: string) => {
  const parsareISO = parseISO(data);
  const dataFormatata = format(parsareISO, "dd.MM.yyyy");

  return dataFormatata;
};

interface InformatiiTichetProps {
  tichet: TichetRaportare;
}

const InformatiiTichet = ({ tichet }: InformatiiTichetProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="uppercase font-bold text-base text-gray-400">
          Id tichet
        </h1>
        <h2 className="font-semibold text-gray-500">
          {`#${tichet.id_raport_problema}`}
        </h2>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="uppercase font-bold text-gray-400">Dată trimitere</h1>
        <h2 className="font-semibold text-gray-500">
          {formatData(tichet.data.toString())}
        </h2>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="uppercase font-bold text-gray-400">Status</h1>
        {tichet.status === 0 ? (
          <h2 className="uppercase font-semibold text-red-500">Nerezolvat</h2>
        ) : (
          <h2 className="uppercase font-semibold text-green-600">Rezolvat</h2>
        )}
      </div>
    </>
  );
};

export default InformatiiTichet;
