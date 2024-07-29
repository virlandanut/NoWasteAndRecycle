import { ContainerInchiriereDepozitareCuRelatii } from "../Container/Inchiriere/Interfete.js";
import { ContainerInchiriereReciclareCuRelatii } from "../Container/Reciclare/Interfete.js";

export interface Utilizator {
  id_utilizator?: number;
  email: string;
  nume_utilizator: string;
  parola: string;
  data_inscriere?: string;
  telefon: string;
  strada: string;
  numar: string;
  localitate: number;
  poza?: string;
}

export interface MetriceUtilizatori {
  utilizatoriNoi: number;
  medieUtilizatoriSaptamana: number;
}

export interface Inchirieri {
  containereReciclare: ContainerInchiriereReciclareCuRelatii[];
  containereDepozitare: ContainerInchiriereDepozitareCuRelatii[];
}
