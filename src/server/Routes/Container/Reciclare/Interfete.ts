import {
  Container_inchiriere_reciclare,
  Firma,
  Container,
} from "@prisma/client";
import { Dayjs } from "dayjs";

export type ContainerInchiriereReciclareCuRelatii =
  Container_inchiriere_reciclare & {
    Firma: Firma;
    Container: Container;
  };
