import {
  Container_inchiriere_reciclare,
  Firma,
  Container,
} from "@prisma/client";

export type ContainerInchiriereReciclareCuRelatii =
  Container_inchiriere_reciclare & {
    Firma: Firma;
    Container: Container;
  };
