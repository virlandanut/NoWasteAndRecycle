import { TichetRaportare } from "../../../../server/Routes/Raportare/Interfete";

export interface TichetRaport {
  tichet: TichetRaportare;
  nume: string;
  rol: string;
}

export interface EroareRaportShow {
  eroare: number;
  mesaj: string;
}

export interface UtilizatorCurent {
  id: number;
  rol: string;
}