export interface DateComentariuFrontEnd {
  id_raport_problema: number;
  mesaj: string;
}

export interface Comentariu {
  id_utilizator: number;
  id_raport_problema: number;
  mesaj: string;
}