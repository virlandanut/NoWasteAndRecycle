export interface Utilizator {
  idUtilizator?: number;
  email: string;
  username: string;
  parola: string;
  dataInscriere: Date;
  telefon: string;
  adresa: string;
}

export interface Persoana {
  idUtilizator?: number;
  nume: string;
  prenume: string;
  CNP: string;
  rol?: string;
}

export type FormValues = {
  nume: string;
  // prenume: string;
  // CNP: string;
  // telefon: string;
  // adresa: string;
  // username: string;
  // email: string;
  // parola: string;
};
