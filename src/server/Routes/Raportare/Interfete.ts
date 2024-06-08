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

export interface dateTichet {
  tichet: TichetRaportare;
  nume: string;
  rol: string;
}

export interface ComentariuTichet {
  nume: string;
  mesaj: string;
  data: Date;
  rol: string;
}

export interface IdRaport {
  id_tichet: number;
}
