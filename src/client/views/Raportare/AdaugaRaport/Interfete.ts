import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormTichet {
  titlu: string;
  mesaj: string;
}

export interface CardRaportareProps {
  renunta: () => void;
  raportare: boolean;
  inchideRaport: () => void;
}

export interface PropsRaportare {
  register: UseFormRegister<FormTichet>;
  errors: FieldErrors<FormTichet>;
  label?: string;
  name: keyof FormTichet;
  type?: string;
  validari: object;
}
