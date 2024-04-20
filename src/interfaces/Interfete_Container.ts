export interface ContainerInchiriere {
  id_container?: number;
  denumire: string;
  capacitate: number;
  status: number;
  strada: string;
  numar: string;
  latitudine: number;
  longitudine: number;
  localitate: string;
  firma: number;
  denumire_firma: string;
  status_aprobare: number;
  descriere: string;
}

export interface ContainerReciclare {
  id_container?: number;
  denumire: string;
  capacitate: number;
  status: number;
  strada: string;
  numar: string;
  latitudine: number;
  longitudine: number;
  localitate: string;
  firma: number;
  denumire_firma: string;
  status_aprobare: number;
  descriere: string;
  tip: string;
}

export interface ContainerMaterialeConstructii {
  id_container?: number;
  denumire: string;
  capacitate: number;
  status: number;
  strada: string;
  numar: string;
  localitate: string;
  firma: string;
  denumire_firma: string;
  status_aprobare: number;
  descriere: string;
}

export interface Container {
  firma?: number;
  denumire: string;
  capacitate: number;
  poza?: string;
  strada: string;
  numar: string;
  descriere: string;
  localitate?: number;
  latitudine?: number;
  longitudine?: number;
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
