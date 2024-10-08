import { Dayjs } from "dayjs";
import { PretContainer } from "../../../../server/Routes/Container/Interfete";
import { Utilizator } from "../../../../server/Routes/Utilizator/Interfete";
import { Persoana } from "../../../../server/Routes/Utilizator/Persoana/Interfete";
import { Firma } from "../../../../server/Routes/Utilizator/Firma/Interfete";

export interface FormInchiriere {
  id_container: number;
  id_utilizator: number;
  data_inceput: Dayjs | null;
  data_sfarsit: Dayjs | null;
  pretTotal: number;
}

export interface ContainerPreturiProps {
  id_container: number | undefined;
  id_utilizator: number | undefined;
  preturi: PretContainer[];
  tip: "reciclare" | "depozitare" | "materiale";
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
