import "express-session";

declare module "express-session" {
  interface SessionData {
    user: {
      id_utilizator?: number;
      email: string;
      nume_utilizator: string;
      data_inscriere: string;
      telefon: string;
      strada: string;
      numar: string;
      localitate: number;
      rol: string;
      poza?: string;
    };
  }
}
