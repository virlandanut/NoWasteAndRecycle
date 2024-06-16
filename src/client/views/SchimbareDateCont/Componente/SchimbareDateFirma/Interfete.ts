import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormSDFirma {
  denumire_firma: string;
  email: string;
  nume_utilizator: string;
  telefon: string;
  strada: string;
  numar: string;
  localitate: string;
}

export interface PropsSDFirma {
  register: UseFormRegister<FormSDFirma>;
  errors: FieldErrors<FormSDFirma>;
  label?: string;
  name: keyof FormSDFirma;
  type?: string;
  validari: object;
  valoareDefault: string;
}
