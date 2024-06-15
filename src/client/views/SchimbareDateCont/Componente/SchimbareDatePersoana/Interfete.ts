import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormSDPersoana {
  nume: string;
  prenume: string;
  email: string;
  nume_utilizator: string;
  telefon: string;
  strada: string;
  numar: string;
  localitate: string;
}

export interface PropsSDPersoana {
  register: UseFormRegister<FormSDPersoana>;
  errors: FieldErrors<FormSDPersoana>;
  label?: string;
  name: keyof FormSDPersoana;
  type?: string;
  validari: object;
  valoareDefault: string;
}
