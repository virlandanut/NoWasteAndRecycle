import {
  Container_inchiriere_reciclare,
  Firma,
  Container,
  Istoric_pret,
  Tip_pret,
} from "@prisma/client";

export type ContainerInchiriereReciclareCuRelatii =
  Container_inchiriere_reciclare & {
    Firma: Firma;
    Container: Container;
  };
