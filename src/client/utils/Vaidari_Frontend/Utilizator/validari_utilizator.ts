import {
  FormFirma,
  FormPersoana,
} from "../../../../interfaces/Interfete_Frontend.js";
import { validareCIF } from "../../Functii_validari.js";

export const verificareForm = {
  telefon: {
    required: "Numărul de telefon este obligatoriu",
    validate: {
      validareTelefon: async (value: string) => {
        if (/^\d+$/.test(value) && /^(07)(?=[2-9])[0-9]{8}$/.test(value)) {
        } else {
          return "Numărul de telefon este invalid";
        }
        try {
          const raspuns = await fetch(
            `${process.env.API_VALIDARE_TELEFON}?telefon=${value}`
          );
          if (raspuns.status === 409) {
            return "Acest număr de telefon există deja";
          }
        } catch (eroare) {
          return "A existat o problemă la validarea numărului de telefon";
        }
      },
    },
    minLength: {
      value: 10,
      message: "Sunt necesare 10 cifre",
    },
    maxLength: {
      value: 10,
      message: "Numărul de cifre este prea mare",
    },
  },
  strada: { required: "Strada este obligatorie" },
  numar: { required: "Numărul este obligatoriu" },
  localitate: { required: "Localitatea este obligatorie" },
  nume_utilizator: {
    required: "Nume utilizator este obligatoriu",
    minLength: { value: 8, message: "Minim 8 caractere" },
    validate: {
      validareUsername: async (value: string) => {
        try {
          const raspuns = await fetch(
            `${process.env.API_VALIDARE_USERNAME}?nume_utilizator=${value}`
          );
          if (raspuns.status === 409) {
            return "Acest nume de utilizator există deja";
          }
        } catch (eroare) {
          return "A exista o problemă la validarea numelui de utilizator";
        }
      },
    },
  },
  email: {
    required: "Adresa de email este obligatorie",
    validate: {
      validareEmail: async (value: string) => {
        if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          return "Adresa de email este invalidă";
        }
        try {
          const raspuns = await fetch(
            `${process.env.API_VALIDARE_EMAIL}?email=${value}`
          );
          if (raspuns.status === 409) {
            return "Acest email există deja";
          }
        } catch (eroare) {
          return "A existat o problemă la validarea adresei de email";
        }
      },
    },
  },
  parola: {
    required: "Parola este obligatorie",
    validate: {
      validareParola: (value: string) => {
        if (value.toLowerCase() === value) {
          return "Parola trebuie să conțină minim o literă mare";
        }
        if (!/[0-9]/.test(value)) {
          return "Parola trebuie să conțină minim o cifră";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return "Parola trebuie să conțină minim un caracter special";
        }
      },
    },
    minLength: { value: 10, message: "Minim 10 caractere" },
  },
  confirmare_parola: {
    required: "Confirmarea este obligatorie",
    validate: {
      verificareParole: (value: string, values: FormPersoana | FormFirma) => {
        if (value.length !== values.parola.length && value !== values.parola) {
          return "Parolele nu se potrivesc";
        }
      },
    },
  },
};

export const verificareFormPersoana = {
  nume: {
    required: "Numele este obligatoriu",
    pattern: {
      value: /^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/,
      message: "Numele nu este valid",
    },
  },
  prenume: {
    required: "Prenumele este obligatoriu",
    pattern: {
      value: /^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/,
      message: "Numele nu este valid",
    },
  },
  cnp: {
    required: "CNP-ul este obligatoriu",
    pattern: {
      value: /^[1|2|5|6][0-9]{12}$/,
      message: "Prima cifră poate fi 1, 2, 5 sau 6",
    },
    minLength: { value: 13, message: "Sunt necesare 13 cifre" },
    maxLength: { value: 13, message: "Numărul de cifre este prea mare" },
    validate: {
      validareCNP: async (value: string) => {
        try {
          const raspuns = await fetch(
            `${process.env.API_VALIDARE_CNP}?cnp=${value}`
          );

          if (raspuns.status === 409) {
            return "Acest CNP există deja";
          }
        } catch (eroare) {
          ("Au existat probleme la validarea CNP-ului");
        }
      },
    },
  },
};

export const verificareFormFirma = {
  denumire_firma: {
    required: "Denumirea este obligatorie",
    pattern: {
      value: /^[A-Z][A-Za-z\s]*\s?(SRL|PFA)$/,
      message: "Numele firmei este invalid",
    },
  },
  cif: {
    required: "CIF-ul este obligatoriu",
    validate: {
      verificareCIF: async (value: string) => {
        if (!validareCIF(value)) {
          return "CIF-ul nu este valid";
        }
        try {
          const raspuns = await fetch(
            `${process.env.API_VALIDARE_CIF}?cif=${value}`
          );
          if (raspuns.status === 409) {
            return "Acest CIF există deja";
          }
        } catch (eroare) {
          return "A existat o eroare la validarea CIF-ului";
        }
      },
    },
  },
  caen: {
    required: "Codul CAEN-ul este obligatoriu",
  },
};

export const verificareLogin = {
  nume_utilizator: {
    required: "Nume utilizator este obligatoriu",
  },
  parola: {
    required: "Parola este obligatorie",
  },
};
