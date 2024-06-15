import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ButonSubmit from "../../componente/Butoane/ButonSubmit";
import SchimbareDatePersoana from "./Componente/SchimbareDatePersoana/SchimbareDatePersoana";

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
    <Dialog open={schimbareDateCont} onClose={inchideSchimbareDateCont}>
      <DialogContent sx={{ padding: 0 }}>
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2 mt-4">
            <ManageAccountsIcon color="success" />
            <span className="font-bold uppercase text-green-600">
              Schimbă datele contului de firmă
            </span>
          </div>
        </DialogTitle>
        <form></form>
        <section className="flex gap-2">
          <ButonSubmit tailwind="w-1/2" text="Schimbă datele" />
          <Button
            className="w-1/2"
            color="error"
            variant="outlined"
            onClick={renunta}>
            Renunțare
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  ) : (
    <SchimbareDatePersoana
      schimbareDateCont={schimbareDateCont}
      inchideSchimbareDateCont={inchideSchimbareDateCont}
      renunta={renunta}
    />
  );
};

export default CardSchimbareDateCont;
