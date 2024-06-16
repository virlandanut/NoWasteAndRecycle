import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ButonSubmit from "../../componente/Butoane/ButonSubmit";
import SchimbareDatePersoana from "./Componente/SchimbareDatePersoana/SchimbareDatePersoana";
import SchimbareDateFirma from "./Componente/SchimbareDateFirma/SchimbareDateFirma";

interface CardSchimbareDateCont {
  schimbareDateCont: boolean;
  inchideSchimbareDateCont: () => void;
  renunta: () => void;
  utilizatorCurent: string;
}

const CardSchimbareDateCont = ({
  schimbareDateCont,
  inchideSchimbareDateCont,
  renunta,
  utilizatorCurent,
}: CardSchimbareDateCont) => {
  return utilizatorCurent === "firma" ? (
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
