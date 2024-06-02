import { FieldErrors, UseFormRegister } from "react-hook-form";

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
