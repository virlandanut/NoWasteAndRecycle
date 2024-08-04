import { ContainerInchiriereDepozitareCuRelatii } from "../../../server/Routes/Container/Inchiriere/Interfete";
import { ContainerInchiriereReciclareCuRelatii } from "../../../server/Routes/Container/Reciclare/Interfete";
import { RegisterOptions } from "react-hook-form";

export interface CardInchiriereContainerReciclareProps {
  containerReciclare: ContainerInchiriereReciclareCuRelatii[] | undefined;
  filtru: number;
  viewFirmaProprietar: boolean;
}

export interface CardInchiriereContainerDepozitareProps {
  containerDepozitare: ContainerInchiriereDepozitareCuRelatii[] | undefined;
  filtru: number;
  viewFirmaProprietar?: boolean;
}

export interface IFormRecenzie {
  scor: number;
  mesaj: string;
}

export const verificareFormAdaugaRecenzie: Record<
  keyof IFormRecenzie,
  RegisterOptions
> = {
  mesaj: {
    required: "Mesajul este obligatoriu",
    minLength: { value: 20, message: "Minim 40 de caractere" },
  },
  scor: {
    min: { value: 1, message: "Scorul minim este 1" },
    max: { value: 5, message: "Scorul maxim este 5" },
  },
};

export interface CardModificaRecenzieProps {
  idRecenzie: number;
  modificaRecenzie: boolean;
  inchideModificaRecenzie: () => void;
  renunta: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CardAdaugaRecenzieProps {
  idContainer: number;
  adaugaRecenzie: boolean;
  inchideAdaugaRecenzie: () => void;
  renunta: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
