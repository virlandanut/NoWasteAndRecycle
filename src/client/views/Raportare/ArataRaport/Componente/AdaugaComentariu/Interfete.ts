import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormComentariu {
  mesaj: string;
}

export interface PropsComentariu {
  register: UseFormRegister<FormComentariu>;
  errors: FieldErrors<FormComentariu>;
  label?: string;
  name?: keyof FormComentariu;
  type?: string;
  validari?: object;
  placeholder?: string;
}

export interface AdaugaComentariuProps {
  id_raport_problema: number;
  setRandeazaDinNou: () => void;
}

export interface DateComentariu {
  id_raport_problema: number;
  mesaj: string;
}

export interface Notificare {
  open: boolean;
  mesaj: string;
  culoare: string;
}