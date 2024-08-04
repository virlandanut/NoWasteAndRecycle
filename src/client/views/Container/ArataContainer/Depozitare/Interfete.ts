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
  poza: string | null;
}

export interface RecenzieCompleta {
  id: number;
  idUtilizator: number;
  rating: number;
  mesaj: string;
  denumire: string;
  poza: string;
  rol: "FIRMA" | "STANDARD" | "ADMINISTRATOR";
  cnp: string;
  dataAchizitie: string;
  dataPostare: string;
}
