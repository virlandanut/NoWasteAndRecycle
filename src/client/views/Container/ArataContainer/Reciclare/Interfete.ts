export interface ContainerReciclare {
  id_container?: number;
  denumire: string;
  capacitate: number;
  status: boolean;
  strada: string;
  numar: string;
  latitudine: number;
  longitudine: number;
  localitate: string;
  firma: number;
  denumire_firma: string;
  status_aprobare: boolean;
  descriere: string;
  tip: string;
  data_inceput: Date | null;
  data_sfarsit: Date | null;
  poza: string | null;
  pretZi?: number;
  pretSaptamana?: number;
  pretLuna?: number;
  pretAn?: number;
}
