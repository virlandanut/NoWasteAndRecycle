import { mesajEroareInterfata } from "../../../interfaces/Interfete_Frontend";

const MesajEroare: React.FC<mesajEroareInterfata> = ({ mesaj }) => {
  return <p className="text-red-600 text-xs ml-3">{mesaj}</p>;
};

export default MesajEroare;
