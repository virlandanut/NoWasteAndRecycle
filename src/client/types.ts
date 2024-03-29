export type FormPersoana = {
  nume: string;
  prenume: string;
  cnp: string;
  telefon: string;
  adresa: string;
  nume_utilizator: string;
  email: string;
  parola: string;
  confirmare_parola?: string;
  data_inscriere: Date;
};

export type FormFirma = {
  denumire_firma: string;
  cif: string;
  caen: string;
  telefon: string;
  adresa: string;
  nume_utilizator: string;
  email: string;
  parola: string;
  confirmare_parola?: string;
  data_inscriere: Date;
};

export type LoginValues = {
  nume_utilizator: string;
  parola: string;
};
