import { CardFirmaProps } from "../Interfete";
import SwitchAprobare from "./SwitchAprobare";

const CardFirma = ({ firma }: CardFirmaProps) => {

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-600">
          {firma.denumire_firma}
        </h1>
        <h2 className="text-xs text-gray-400">
          {" "}
          CIF: <span className="text-gray-500 font-semibold">{firma.cif}</span>
        </h2>
        <h2 className="text-xs text-gray-400">
          Data înscriere:{" "}
          <span className="text-gray-500 font-semibold">
            {new Date(firma.data_inscriere)
              .toLocaleDateString()
              .replaceAll("/", ".")}
          </span>
        </h2>
        <h2 className="text-xs text-gray-400">
          Email:{" "}
          <span className="text-gray-500 font-semibold">{firma.email}</span>
        </h2>
      </div>
      <SwitchAprobare id_utilizator={firma.id_utilizator} status_aprobare={firma.status_aprobare} />
    </div>
  );
};

export default CardFirma;
