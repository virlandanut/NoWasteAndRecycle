export interface ContainerInchiriere {
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
  data_inceput: Date | null;
  data_sfarsit: Date | null;
  pretZi?: number;
  pretSaptamana?: number;
  pretLuna?: number;
  pretAn?: number;
}

export interface RecenzieCompleta {
  id: number;
  rating: number;
  denumire: string;
  mesaj: string;
  dataAchizitie: string;
  dataPostare: string;
}
