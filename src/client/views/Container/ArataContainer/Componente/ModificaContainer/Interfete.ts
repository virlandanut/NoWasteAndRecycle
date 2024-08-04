import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InterfataNotificare } from "../../../../../componente/Erori/Notificare/Interfete";
import { ContainerCuPret } from "../../../../../../server/Routes/Container/Interfete";

export interface ModificaContainerProps {
  id: number;
  modificareContainer: boolean;
  inchideModificareContainer: () => void;
  renunta: () => void;
  setNotificare: (notificare: InterfataNotificare) => void;
  tip: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
  refresh: () => void;
}

export interface FormSDContainer {
  denumire: string;
  poza: string;
  descriere: string;
  pretZi: number;
  pretSaptamana: number;
  pretLuna: number;
  pretAn: number;
}

export interface PropsSDContainer {
  register: UseFormRegister<FormSDContainer>;
  errors: FieldErrors<FormSDContainer>;
  label?: string;
  name: keyof FormSDContainer;
  type?: string;
  validari: object;
  valoareDefault: String;
  rows?: number;
}

export interface PropsSDContainerPreturi {
  register: UseFormRegister<FormSDContainer>;
  errors: FieldErrors<FormSDContainer>;
  label?: string;
  name?: keyof FormSDContainer;
  type?: string;
  validari?: object;
  preturiInitiale: { tip: string; valoare: number }[];
  resetField: Function;
}
