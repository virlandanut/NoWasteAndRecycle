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

export interface mesajEroareInterfata {
  mesaj: string;
}

export interface headerInterfata {
  mesaj: string;
}
