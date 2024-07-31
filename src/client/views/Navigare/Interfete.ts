import { Container, Firma, Localitate } from "@prisma/client";

export interface FormHartaPrincipala {
  tip_container: string;
  distanta_maxima: number;
  pretul_maxim: number;
}

export interface ICoordonate {
  latitudine: number;
  longitudine: number;
}

export interface IContainerOptim {
  container: Container & { Firma: Firma; Localitate: Localitate };
  tip: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
  distanta: number;
  pret: number;
  dataInceput: string;
  dataSfarsit: string;
}
