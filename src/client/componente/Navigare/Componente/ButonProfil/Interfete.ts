import { Firma } from "../../../../../server/Routes/Utilizator/Firma/Interfete";
import { Utilizator } from "../../../../../server/Routes/Utilizator/Interfete";
import { Persoana } from "../../../../../server/Routes/Utilizator/Persoana/Interfete";

export interface ButonProfilProps {
  deschideRaport: () => void;
  deschideSchimbareParola: () => void;
  deschideSchimbareDateCont: () => void;
}

export interface UtilizatorCurentPersoana {
  utilizator: Utilizator;
  persoana: Persoana;
  mesaj: string;
}

export interface UtilizatorCurentFirma {
  utilizator: Utilizator;
  firma: Firma;
  mesaj: string;
}
