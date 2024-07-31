import { Container } from "@prisma/client";

export type ContainerNou = Omit<
  Container,
  "id_container" | "status" | "data_adaugare" | "poza"
>;

export enum Tip {
  FIX = "FIX",
  MOBIL = "MOBIL",
  RECICLARE = "RECICLARE",
}

export interface DateContainerFrontEnd {
  denumire: string;
  capacitate: number;
  strada: string;
  numar: string;
  descriere: string;
}

export interface ContainerReciclareFrontEnd {
  denumire: string;
  capacitate: string;
  tip: string;
  strada: string;
  numar: string;
  localitate: string;
  pretZi: string;
  pretSaptamana: string;
  pretLuna: string;
  pretAn: string;
  descriere: string;
}

export interface PretContainer {
  denumire_tip_pret: string;
  pret: number;
}

export interface TipContainer {
  id_tip: number;
  denumire_tip: string;
}

export interface Coordonate {
  latitudine: number;
  longitudine: number;
}

export interface MetriceContainere {
  numarContainere: number;
  data_adaugare: Date;
}

export interface DateSelectieContainer {
  tipContainer: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
  buget: string;
  capacitate: string;
  coordonate: {
    latitudine: number;
    longitudine: number;
  };
  data_inceput: string;
  data_sfarsit: string;
  tip: string;
  bugetPrioritar: boolean;
}
