import {
  Container,
  Container_inchiriere_depozitare,
  Utilizator,
  Recenzie,
} from "@prisma/client";

export interface ContainerDepozitareFrontEnd {
  denumire: string;
  capacitate: string;
  strada: string;
  numar: string;
  localitate: string;
  pretZi: string;
  pretSaptamana: string;
  pretLuna: string;
  pretAn: string;
  descriere: string;
  poza: string;
  codPostal: string;
}

export type ContainerInchiriereDepozitareCuRelatii =
  Container_inchiriere_depozitare & {
    Utilizator: Utilizator;
    Container: Container;
  };

export type RecenzieContainer = Recenzie & {
  Container_inchiriere: Container_inchiriere_depozitare & {
    Utilizator: Utilizator;
  };
};
