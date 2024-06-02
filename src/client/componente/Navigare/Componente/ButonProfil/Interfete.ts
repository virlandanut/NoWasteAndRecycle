import { Firma } from "../../../../../server/Interfete/Interfete_Firma.js";
import { Persoana } from "../../../../../server/Interfete/Interfete_Persoana.js";
import { Utilizator } from "../../../../../server/Interfete/Interfete_Utilizator.js";

export interface ButonProfilProps {
  deschideRaport: () => void;
  deschideSchimbareParola: () => void;
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
