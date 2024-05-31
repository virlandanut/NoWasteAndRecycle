import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ChangeEventHandler, ReactNode } from "react";
import { Dayjs } from "dayjs";



export interface FormSchimbareParola {
  parolaVeche: string;
  parolaNoua: string;
  parolaNouaRepetata: string;
}

export interface FormSchimbareParolaProps {
  register: UseFormRegister<FormSchimbareParola>;
  errors: FieldErrors<FormSchimbareParola>;
  label?: string;
  name: keyof FormSchimbareParola;
  type?: string;
  autocomplete: string;
}

export interface FormTichet {
  titlu: string;
  mesaj: string;
}

export interface PropsRaportare {
  register: UseFormRegister<FormTichet>;
  errors: FieldErrors<FormTichet>;
  label?: string;
  name: keyof FormTichet;
  type?: string;
  validari: object;
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

export interface PropsContainer {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name?: keyof FormContainer;
  type?: string;
  validari?: object;
  resetField?: Function;
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
