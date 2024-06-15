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

export interface MetriceContainere {
  numarContainere: number;
  data_adaugare: Date;
}
