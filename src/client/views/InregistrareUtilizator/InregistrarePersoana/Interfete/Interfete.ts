import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormPersoana {
  nume: string;
  prenume: string;
  cnp: string;
  email: string;
  nume_utilizator: string;
  parola: string;
  telefon: string;
  strada: string;
  numar: string;
  localitate: number;
  confirmare_parola?: string;
}

export interface PropsPersoana {
  register: UseFormRegister<FormPersoana>;
  errors: FieldErrors<FormPersoana>;
  label?: string;
  name: keyof FormPersoana;
  type?: string;
  validari: object;
}
