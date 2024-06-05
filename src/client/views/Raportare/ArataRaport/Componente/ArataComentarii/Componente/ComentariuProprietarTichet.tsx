import { ComentariuTichet } from "../../../../../../../server/Routes/Raportare/Interfete";
interface ComentariuProprietarTichetProps {
  comentariu: ComentariuTichet;
  selfEnd?: boolean;
}

const ComentariuProprietarTichet = ({
  comentariu,
  selfEnd = true,
}: ComentariuProprietarTichetProps) => {
  return (
    <div
      className={`w-1/2 border rounded flex flex-col gap-4 p-4 ${selfEnd ? "self-end" : ""} shadow-sm`}>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <h2 className="font-bold text-gray-600 text-lg">{comentariu.nume}</h2>
        </div>
        <span className="text-xs text-gray-500 italic">{`<${comentariu.rol} tichet>`}</span>
      </div>
      <p className="text-sm text-gray-500">{comentariu.mesaj}</p>
      <h3 className="text-sm text-gray-400 self-end">
        {comentariu.data.toString()}
      </h3>
    </div>
  );
};

export default ComentariuProprietarTichet;
