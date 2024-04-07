import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ChangeEventHandler, ReactNode } from "react";

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
