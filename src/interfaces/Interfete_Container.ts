// export interface ContainerInchiriere {
//   id_container: number;
//   denumire: string;
//   capacitate: number;
//   status: number;
//   adresa: string;
//   id_utilizator: number;
//   denumire_firma: string;
//   status_aprobare: number;
//   descriere: string;
// }

export interface Container {
  firma?: number;
  denumire: string;
  capacitate: number;
  poza?: string;
  strada: string;
  numar: string;
  descriere: string;
  localitate?: number;
}

export interface PretContainer {
  denumire_tip_pret: string;
  pret: number;
}

export interface TipContainer {
  id_tip: number;
  denumire_tip: string;
}
