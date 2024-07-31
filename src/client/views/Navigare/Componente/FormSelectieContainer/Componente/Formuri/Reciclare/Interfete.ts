import { Dayjs } from "dayjs";

export interface FormSelectieReciclare {
  tipContainer: "RECICLARE" | "DEPOZITARE" | "MATERIALE";
  capacitate: number;
  tip: string;
  data_inceput: Dayjs | null;
  data_sfarsit: Dayjs | null;
  buget: string;
  bugetPrioritar: boolean;
}
