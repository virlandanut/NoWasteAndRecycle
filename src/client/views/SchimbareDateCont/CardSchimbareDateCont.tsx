import SchimbareDatePersoana from "./Componente/SchimbareDatePersoana/SchimbareDatePersoana";
import SchimbareDateFirma from "./Componente/SchimbareDateFirma/SchimbareDateFirma";
import { Utilizator } from "@prisma/client";
import { Button } from "@mui/material";

interface CardSchimbareDateCont {
  schimbareDateCont: boolean;
  inchideSchimbareDateCont: () => void;
  renunta: () => void;
  utilizatorCurent: Utilizator;
}

const CardSchimbareDateCont = ({
  schimbareDateCont,
  inchideSchimbareDateCont,
  renunta,
  utilizatorCurent,
}: CardSchimbareDateCont) => {
  return utilizatorCurent.rol === "FIRMA" ? (
    <SchimbareDateFirma
      schimbareDateCont={schimbareDateCont}
      inchideSchimbareDateCont={inchideSchimbareDateCont}
      renunta={renunta}
    />
  ) : (
    <SchimbareDatePersoana
      schimbareDateCont={schimbareDateCont}
      inchideSchimbareDateCont={inchideSchimbareDateCont}
      renunta={renunta}
    />
  );
};

export default CardSchimbareDateCont;
