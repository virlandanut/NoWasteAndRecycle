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

export interface DateSelectieContainerReciclare {
  buget: string;
  capacitate: string;
  coordonate: {
    latitudine: number;
    longitudine: number;
  };
  data_inceput: string;
  data_sfarsit: string;
  tip: string;
  bugetPrioritar: boolean;
}
