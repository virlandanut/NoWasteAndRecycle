import { Istoric_pret, Tip_pret } from "@prisma/client";

export interface CalculeazaPretTotalParams {
  dataInceput: Date;
  dataSfarsit: Date;
  preturi: (Istoric_pret & { Tip_pret: Tip_pret })[];
}

export interface PreturiContainer {
  pretFinal: number;
  taxaPlatforma: number;
}
