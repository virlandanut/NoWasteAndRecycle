import { Comentariu } from "@prisma/client";

export interface DateComentariuFrontEnd {
  id_raport_problema: number;
  mesaj: string;
}

export type ComentariuNou = Omit<Comentariu, "id_comentariu" | "data">;
