import { FieldErrors, UseFormRegister } from "react-hook-form";

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

export interface PropsFirma {
  register: UseFormRegister<FormFirma>;
  errors: FieldErrors<FormFirma>;
  label?: string;
  name: keyof FormFirma;
  type?: string;
  validari: object;
}