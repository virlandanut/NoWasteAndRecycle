import axios from "axios";

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
    validate: {
      validareContainer: async (value: string) => {
        try {
          await axios.get(
            `${process.env.API_VALIDARE_DENUMIRE_CONTAINER}?denumire=${value}`
          );
        } catch (eroare: any) {
          if (eroare.response.status === 409) {
            return "Aceast container există deja";
          } else {
            return "Au existat probleme la validarea denumirii containerului";
          }
        }
      },
    },
  },
  capacitate: {
    required: "Capacitatea este obligatorie",
    validate: {
      validareCapacitate: (value: string) => {
        if (parseInt(value) < 0) {
          return "Capacitatea trebuie să fie pozitivă";
        } else if (!/^\d+$/.test(value)) {
          return "Capacitatea trebuie să fie numerică";
        } else if (parseInt(value) < 50) {
          return "Capacitatea minimă trebuie să fie de 50 de kg";
        }
      },
    },
  },
  tip: {
    required: "Tipul este obligatoriu",
  },
  strada: {
    required: "Strada este obligatorie",
    validate: {
      validareStrada: (value: string) => {
        if (/^\d+$/.test(value.trim())) {
          return "Adresa nu poate conține doar cifre";
        }
      },
    },
  },
  numar: {
    required: "Numărul este obligatoriu",
    validate: {
      validareStrada: (value: string) => {
        if (!/^\d+[A-Za-z]?$/.test(value.trim())) {
          return "Numărul este eronat";
        }
      },
    },
  },
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
    required: "Prețul este obligatoriu",
    validate: {
      validarePret: (value: string) => {
        if (value !== undefined && !parseInt(value) && value.length !== 0) {
          return "Prețul trebuie să fie numeric";
        } else if (parseInt(value) < 0) {
          return "Prețul trebuie să fie pozitiv";
        } else if (parseInt(value) < 100) {
          return "Prețul minim este de 100 de lei";
        }
      },
    },
  },
  codPostal: {
    required: "Codul poștal este obligatoriu",
    validate: {
      validareCodPostal: (value: string) => {
        const regex = /^90[0-7]\d{3}$/;
        if (!regex.test(value)) {
          return "Cod poștal trebuie să fie între 900001 - 907299)";
        }
      },
    },
  },
  trigger: "onTouch",
};
