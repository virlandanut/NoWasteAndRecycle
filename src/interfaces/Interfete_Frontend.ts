import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ChangeEventHandler, ReactNode } from "react";
import { Dayjs } from "dayjs";

export interface FormPersoana {
  nume: string;
  prenume: string;
  cnp: string;
  email: string;
  nume_utilizator: string;
  parola: string;
  data_inscriere: Date;
  telefon: string;
  strada: string;
  numar: string;
  localitate: number;
  confirmare_parola?: string;
}

export interface FormFirma {
  denumire_firma: string;
  cif: string;
  caen: string;
  email: string;
  nume_utilizator: string;
  parola: string;
  data_inscriere: Date;
  telefon: string;
  strada: string;
  numar: string;
  localitate: number;
  confirmare_parola?: string;
}

export interface FormContainer {
  denumire: string;
  capacitate: number;
  tip: string;
  strada: string;
  numar: string;
  localitate: number;
  descriere: string;
  pretZi: number;
  pretSaptamana: number;
  pretLuna: number;
  pretAn: number;
  poza?: string;
}

export interface FormInchiriereDepozitare {
  id_container: number;
  id_utilizator: number;
  data_inceput: Dayjs;
  data_sfarsit: Dayjs;
  pretTotal: number;
}

export interface FormHartaPrincipala {
  tip_container: string;
  distanta_maxima: number;
  pretul_maxim: number;
}

export interface LoginValues {
  nume_utilizator: string;
  parola: string;
}

export interface PropsFirma {
  register: UseFormRegister<FormFirma>;
  errors: FieldErrors<FormFirma>;
  label?: string;
  name: keyof FormFirma;
  type?: string;
  validari: object;
}

export interface PropsContainer {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name?: keyof FormContainer;
  type?: string;
  validari?: object;
  resetField?: Function;
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
