import { FormFirma } from "../../../client/views/InregistrareUtilizator/InregistrareFirma/Interfete/Interfete.js";
import { FormPersoana } from "../../../client/views/InregistrareUtilizator/InregistrarePersoana/Interfete/Interfete.js";
import { Firma } from "../../Routes/Utilizator/Firma/Interfete.js";
import { Utilizator } from "../../Routes/Utilizator/Interfete.js";
import { Persoana } from "../../Routes/Utilizator/Persoana/Interfete.js";

interface DateInregistrareUtilizator {
  telefon: string;
  strada: string;
  numar: string;
  localitate: string;
  nume_utilizator: string;
  email: string;
  parola: string;
}

interface DateInregistrarePersoana {
  nume: string;
  prenume: string;
  cnp: string;
}

interface DateInregistrareFirma {
  denumire_firma: string;
  cif: string;
  caen: string;
}

export const creareUtilizator = (formData: DateInregistrareUtilizator) => {
  return {
    email: formData.email,
    nume_utilizator: formData.nume_utilizator,
    parola: formData.parola,
    telefon: formData.telefon,
    strada: formData.strada,
    numar: formData.numar,
    localitate: formData.localitate,
  };
};

export const crearePersoana = (formData: DateInregistrarePersoana) => {
  return {
    nume: formData.nume,
    prenume: formData.prenume,
    cnp: formData.cnp,
  };
};

export const creareFirma = (formData: DateInregistrareFirma) => {
  return {
    denumire_firma: formData.denumire_firma,
    cif: formData.cif,
    caen: parseInt(formData.caen),
  };
};
