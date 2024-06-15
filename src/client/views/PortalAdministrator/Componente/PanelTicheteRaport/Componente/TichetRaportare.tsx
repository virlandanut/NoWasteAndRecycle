import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { Link } from "react-router-dom";
import { TichetRaportareProps } from "../Interfete";

const TichetRaportare = ({ tichet }: TichetRaportareProps) => {
  return (
    <Link
      className="hover:bg-gray-100 p-4"
      to={`/raport/${tichet.id_raport_problema}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-600">
            {tichet.titlu}
          </h1>
          <h2 className="text-xs text-gray-400">
            {" "}
            Postat de:{" "}
            <span className="text-gray-500 font-semibold">
              {tichet.utilizator}
            </span>
          </h2>
          <h2 className="text-xs text-gray-400">
            Data:{" "}
            <span className="text-gray-500 font-semibold">
              {new Date(tichet.data).toLocaleDateString().replaceAll("/", ".")}
            </span>
          </h2>
        </div>
        <div>
          <ErrorRoundedIcon fontSize="medium" color="warning" />
        </div>
      </div>
    </Link>
  );
};

export default TichetRaportare;
