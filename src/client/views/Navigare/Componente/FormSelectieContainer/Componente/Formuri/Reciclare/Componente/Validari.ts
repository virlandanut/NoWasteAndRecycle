import dayjs, { Dayjs } from "dayjs";
import { FormSelectieReciclare } from "../Interfete";
import { Validate } from "react-hook-form";

export const verificareFormSelectieReciclare = {
  tip: {
    required: "Tipul containerului este obligatoriu",
  },
  capacitate: {
    validate: {
      validareCapacitate: (value: string) => {
        if (value !== undefined && !parseInt(value) && value.length !== 0) {
          return "Capacitatea trebuie să fie numerică";
        }
      },
    },
  },
  buget: {
    validate: {
      validareBuget: (value: string, values: FormSelectieReciclare) => {
        if (value !== undefined && !parseInt(value) && value.length !== 0) {
          return "Bugetul trebuie să fie numeric";
        } else if (parseInt(value) < 100) {
          return "Prețul minim este 100 de RON";
        } else if (values.data_inceput && values.data_sfarsit && !value) {
          return "Acest câmp este obligatoriu";
        }
      },
    },
  },
  data_inceput: {
    validate: {
      validareData: (value: Dayjs | null, values: FormSelectieReciclare) => {
        if (dayjs(value).isAfter(dayjs(values.data_sfarsit))) {
          return "Intervalul este eronat";
        }
      },
    },
  },
  data_sfarsit: {
    validate: {
      validareData: (value: Dayjs | null, values: FormSelectieReciclare) => {
        if (dayjs(value).isBefore(dayjs(values.data_sfarsit))) {
          return "Intervalul este eronat";
        } else if (values.data_inceput && !value) {
          return "Acest câmp este obligatoriu";
        }
      },
    },
  },
};
