import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormFirma, FormPersoana, LoginValues } from "./src/client/types.js";
import { ChangeEventHandler, ReactNode } from "react";

export interface Utilizator {
  id_utilizator?: number;
  email: string;
  nume_utilizator: string;
  parola: string;
  data_inscriere: string;
  telefon: string;
  adresa: string;
  poza?: string;
}

export interface Persoana {
  id_utilizator?: number;
  cnp: string;
  nume: string;
  prenume: string;
  rol?: string;
}

export interface Firma {
  id_utilizator?: number;
  cif: string;
  denumire_firma: string;
  caen: number;
}

export interface codCAEN {
  cod_caen: number;
}

export interface headerInterfata {
  mesaj: string;
  marime?: string;
}

export interface PropsFirma {
  register: UseFormRegister<FormFirma>;
  errors: FieldErrors<FormFirma>;
  label?: string;
  name: keyof FormFirma;
  type?: string;
  validari: object;
}

export interface PropsPersoana {
  register: UseFormRegister<FormPersoana>;
  errors: FieldErrors<FormPersoana>;
  label?: string;
  name: keyof FormPersoana;
  type?: string;
  validari: object;
}

export interface PropsAutentificare {
  register: UseFormRegister<LoginValues>;
  errors: FieldErrors<LoginValues>;
  label?: string;
  name: keyof LoginValues;
  type?: string;
  stateLogin?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
  validari: object;
  autocomplete?: string;
}

export interface AuthProps {
  children: ReactNode;
}

export interface mesajEroareInterfata {
  mesaj: string;
}

export interface PropsSectiune {
  tailwind?: string;
  children: ReactNode;
}

export type ContainerInchiriere = {
  id_container: number;
  denumire: string;
  capacitate: number;
  status: number;
  adresa: string;
  id_utilizator: number;
  denumire_firma: string;
  status_aprobare: number;
};

export type PretContainer = {
  denumire_tip_pret: string;
  pret: number;
};
