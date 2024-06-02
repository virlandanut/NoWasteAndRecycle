import { Dayjs } from "dayjs";
import { PretContainer } from "../../../../server/Interfete/Interfete_Container.js";
import { Persoana } from "../../../../server/Interfete/Interfete_Persoana.js";
import { Utilizator } from "../../../../server/Interfete/Interfete_Utilizator.js";
import { Firma } from "../../../../server/Interfete/Interfete_Firma.js";

export interface FormInchiriereDepozitare {
  id_container: number;
  id_utilizator: number;
  data_inceput: Dayjs;
  data_sfarsit: Dayjs;
  pretTotal: number;
}

export interface ContainerPreturiProps {
  id_container: number | undefined;
  id_utilizator: number | undefined;
  preturi: PretContainer[];
}

export interface Perioade {
  [key: string]: number;
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
