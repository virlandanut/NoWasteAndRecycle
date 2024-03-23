export type FormPersoana = {
  nume: string;
  prenume: string;
  CNP: string;
  telefon: string;
  adresa: string;
  username: string;
  email: string;
  parola: string;
  confirmareParola?: string;
  dataInscriere: Date;
};

export type FormFirma = {
  denumire: string;
  cif: string;
  caen: string;
  telefon: string;
  adresa: string;
  username: string;
  email: string;
  parola: string;
  confirmareParola?: string;
  dataInscriere: Date;
};

export type LoginValues = {
  username: string;
  parola: string;
};
