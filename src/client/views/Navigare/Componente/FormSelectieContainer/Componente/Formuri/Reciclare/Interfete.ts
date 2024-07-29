import { Dayjs } from "dayjs";

export interface FormSelectieReciclare {
  capacitate: number;
  tip: string;
  data_inceput: Dayjs | null;
  data_sfarsit: Dayjs | null;
  buget: string;
  bugetPrioritar: boolean;
}
