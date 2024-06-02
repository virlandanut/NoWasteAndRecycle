import { ChangeEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormAutentificare {
  nume_utilizator: string;
  parola: string;
}

export interface PropsAutentificare {
  register: UseFormRegister<FormAutentificare>;
  errors: FieldErrors<FormAutentificare>;
  label?: string;
  name: keyof FormAutentificare;
  type?: string;
  stateLogin?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
  autocomplete?: string;
}
