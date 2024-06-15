export interface Persoana {
  id_utilizator?: number;
  nume: string;
  prenume: string;
  cnp: string;
  rol?: string;
}

export interface DateExistentePersoana {
  nume: string;
  prenume: string;
  email: string;
  nume_utilizator: string;
  telefon: string;
  strada: string;
  numar: string;
  localitate: string;
}

export interface NumeRolPersoana {
  nume: string;
  rol: string;
}

export interface DateInregistrariPersoane {
  numarPersoane: number;
  data_inscriere: Date;
}
