import { ContainerInchiriereDepozitareCuRelatii } from "../../../server/Routes/Container/Inchiriere/Interfete";
import { ContainerInchiriereReciclareCuRelatii } from "../../../server/Routes/Container/Reciclare/Interfete";

export interface CardInchiriereContainerReciclareProps {
  containerReciclare: ContainerInchiriereReciclareCuRelatii[] | undefined;
  filtru: number;
}

export interface CardInchiriereContainerDepozitareProps {
  containerDepozitare: ContainerInchiriereDepozitareCuRelatii[] | undefined;
  filtru: number;
}
