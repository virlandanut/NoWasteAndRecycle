import axios from "axios";
import { FormValues } from "../types";

export const verificareForm = {
  nume: {
    required: "Numele este obligatoriu",
    pattern: {
      value: /^[A-Z][a-z]*$/,
      message: "Numele nu este valid",
    },
  },
  prenume: {
    required: "Prenumele este obligatoriu",
    pattern: {
      value: /^[A-Z][a-z]*$/,
      message: "Numele nu este valid",
    },
  },
  CNP: {
    required: "CNP-ul este obligatoriu",
    pattern: {
      value: /^[1|2|5|6][0-9]{12}$/,
      message: "Prima cifră poate fi 1, 2, 5 sau 6",
    },
    minLength: { value: 13, message: "Sunt necesare 13 cifre" },
    validate: {
      validareCNP: async (value: string) => {
        const raspuns = await axios.get(
          `${process.env.API_VALIDARE_CNP}?CNP=${value}`
        );
        if (raspuns.data > 0) {
          return "Acest CNP există deja";
        }
      },
    },
  },
  telefon: {
    required: "Numărul de telefon este obligatoriu",
    validate: {
      validareTelefon: async (value: string) => {
        if (/^\d+$/.test(value) && /^(07)(?=[2-9])[0-9]{8}$/.test(value)) {
        } else {
          return "Numărul de telefon este invalid";
        }
        const raspuns = await axios.get(
          `${process.env.API_VALIDARE_TELEFON}?telefon=${value}`
        );
        if (raspuns.data > 0) {
          return "Acest număr de telefon există deja";
        }
      },
    },
    minLength: {
      value: 10,
      message: "Sunt necesare 10 cifre",
    },
  },
  adresa: { required: "Adresa este obligatorie" },
  username: {
    required: "Nume utilizator este obligatoriu",
    minLength: { value: 8, message: "Minim 8 caractere" },
    validate: {
      validareUsername: async (value: string) => {
        const raspuns = await axios.get(
          `${process.env.API_VALIDARE_USERNAME}?username=${value}`
        );
        if (raspuns.data > 0) {
          return "Acest nume de utilizator există deja";
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
        const raspuns = await axios.get(
          `${process.env.API_VALIDARE_EMAIL}?email=${value}`
        );
        if (raspuns.data > 0) {
          return "Acest email există deja";
        }
      },
    },
  },
  parola: { required: "Parola este obligatorie" },
  confirmareParola: {
    required: "Confirmarea este obligatorie",
    validate: {
      verificareParole: (value: string, values: FormValues) => {
        if (value !== values.parola) {
          return "Parolele nu se potrivesc";
        }
      },
    },
  },
};
