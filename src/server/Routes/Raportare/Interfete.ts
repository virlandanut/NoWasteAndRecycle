export interface Raportare {
  idUtilizator: number;
  titlu: string;
  mesaj: string;
}

export interface TichetRaportare {
  id_raport_problema: number;
  utilizator: number;
  titlu: string;
  mesaj: string;
  data: Date;
  status: number;
}

export interface RaportUtilizator {
  utilizator: string;
  rol: string;
  titlu: string;
  mesaj: string;
  data: string;
  status: number;
}

export interface dateTichetFirma {
  tichet: TichetRaportare;
  denumireFirma: string;
  rol: string;
}