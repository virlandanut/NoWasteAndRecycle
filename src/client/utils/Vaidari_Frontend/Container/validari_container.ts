import { FormContainer } from "../../../../interfaces/Interfete_Frontend";

export const verificareFormContainer = {
  denumire: {
    required: "Denumirea este obligatorie",
    minLength: {
      value: 8,
      message: "Minim 8 caractere",
    },
    maxLength: {
      value: 20,
      message: "Maxim 20 de caractere",
    },
  },
  capacitate: {
    required: "Capacitatea este obligatorie",
    validate: {
      validareCapacitate: async (value: number) => {
        if (value < 50) {
          return "Capacitatea minimă admisă este de 50 de kg";
        }
      },
    },
  },
  tip: {
    required: "Tipul este obligatoriu",
  },
  strada: { required: "Strada este obligatorie" },
  numar: { required: "Numărul este obligatoriu" },
  localitate: { required: "Localitatea este obligatorie" },
  descriere: {
    required: "Descrierea este obligatorie",
    validate: {
      validareDescriere: (value: string) => {
        if (value.length < 40) {
          return "Minim 40 de caractere";
        }
      },
    },
  },
  pret: {
    validate: {
      validarePreturi: (value: string) => {
        if (value === "") {
          return "Prețul este obligatoriu";
        }
      },
    },
  },
  trigger: "onTouch",
};
