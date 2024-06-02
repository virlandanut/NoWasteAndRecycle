import { FieldErrors, UseFormRegister } from "react-hook-form";

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

export interface PropsContainer {
  register: UseFormRegister<FormContainer>;
  errors: FieldErrors<FormContainer>;
  label?: string;
  name?: keyof FormContainer;
  type?: string;
  validari?: object;
  resetField?: Function;
}