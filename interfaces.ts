import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormFirma, FormPersoana, LoginValues } from "./src/client/types.js";
import { ChangeEventHandler, ReactNode } from "react";

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

export interface Firma {
  idUtilizator?: number;
  denumire: string;
  cif: string;
  caen: string;
}

export interface codCAEN {
  codCaen: number;
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
}

export interface mesajEroareInterfata {
  mesaj: string;
}

export interface PropsSectiune {
  tailwind?: string;
  children: ReactNode;
}
export interface PropsSectiuneImagine {
  tailwind?: string;
  tailwindImagine?: string;
  sursaImagine: string;
}
export interface PropsButonSubmit {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  text: string;
}

export interface PropsButonRedirect {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  catre: string;
  text: string;
}
