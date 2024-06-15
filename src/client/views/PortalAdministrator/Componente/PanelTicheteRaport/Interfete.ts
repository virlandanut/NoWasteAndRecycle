export interface Tichet {
  id_raport_problema: number;
  titlu: string;
  status: number;
  data: Date;
  utilizator: string;
}

export interface TichetRaportareProps {
  tichet: Tichet;
}
