import axios from "axios";
import { FormFirma, FormPersoana } from "../types";
import { validareCIF } from "./Functii";

export const verificareFormPersoana = {
  nume: {
    required: "Numele este obligatoriu",
    pattern: {
      value: /^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/,
      message: "Numele nu este valid"
    }
  },
  prenume: {
    required: "Prenumele este obligatoriu",
    pattern: {
      value: /^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/,
      message: "Numele nu este valid"
    }
  },
  CNP: {
    required: "CNP-ul este obligatoriu",
    pattern: {
      value: /^[1|2|5|6][0-9]{12}$/,
      message: "Prima cifră poate fi 1, 2, 5 sau 6"
    },
    minLength: { value: 13, message: "Sunt necesare 13 cifre" },
    maxLength: { value: 13, message: "Numărul de cifre este prea mare" },
    validate: {
      validareCNP: async (value: string) => {
        const raspuns = await axios.get(`${process.env.API_VALIDARE_CNP}?CNP=${value}`);
        if (raspuns.data > 0) {
          return "Acest CNP există deja";
        }
      }
    }
  },
  telefon: {
    required: "Numărul de telefon este obligatoriu",
    validate: {
      validareTelefon: async (value: string) => {
        if (/^\d+$/.test(value) && /^(07)(?=[2-9])[0-9]{8}$/.test(value)) {
        } else {
          return "Numărul de telefon este invalid";
        }
        const raspuns = await axios.get(`${process.env.API_VALIDARE_TELEFON}?telefon=${value}`);
        if (raspuns.data > 0) {
          return "Acest număr de telefon există deja";
        }
      }
    },
    minLength: {
      value: 10,
      message: "Sunt necesare 10 cifre"
    },
    maxLength: {
      value: 10,
      message: "Numărul de cifre este prea mare"
    }
  },
  adresa: { required: "Adresa este obligatorie" },
  username: {
    required: "Nume utilizator este obligatoriu",
    minLength: { value: 8, message: "Minim 8 caractere" },
    validate: {
      validareUsername: async (value: string) => {
        const raspuns = await axios.get(`${process.env.API_VALIDARE_USERNAME}?username=${value}`);
        if (raspuns.data > 0) {
          return "Acest nume de utilizator există deja";
        }
      }
    }
  },
  email: {
    required: "Adresa de email este obligatorie",
    validate: {
      validareEmail: async (value: string) => {
        if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          return "Adresa de email este invalidă";
        }
        const raspuns = await axios.get(`${process.env.API_VALIDARE_EMAIL}?email=${value}`);
        if (raspuns.data > 0) {
          return "Acest email există deja";
        }
      }
    }
  },
  parola: { required: "Parola este obligatorie" },
  confirmareParola: {
    required: "Confirmarea este obligatorie",
    validate: {
      verificareParole: (value: string, values: FormPersoana) => {
        if (value !== values.parola) {
          return "Parolele nu se potrivesc";
        }
      }
    }
  }
};

export const verificareLogin = {
  username: {
    required: "Nume utilizator este obligatoriu"
  },
  parola: {
    required: "Parola este obligatorie"
  }
};

export const verificareFormFirma = {
  denumire: {
    required: "Denumirea este obligatorie",
    pattern: {
      value: /^[A-Z][A-Za-z\s]*\s?(SRL|PFA)$/,
      message: "Numele firmei este invalid"
    }
  },
  cif: {
    required: "CIF-ul este obligatoriu",
    validate: {
      verificareCIF: async (value: string) => {
        if (!validareCIF(value)) {
          return "CIF-ul nu este valid";
        }
        const raspuns = await axios.get(`${process.env.API_VALIDARE_CIF}?cif=${value}`);
        if (raspuns.data > 0) {
          return "Acest CIF există deja";
        }
      }
    }
  },
  caen: {
    required: "Codul CAEN-ul este obligatoriu"
  },
  telefon: {
    required: "Numărul de telefon este obligatoriu",
    validate: {
      validareTelefon: async (value: string) => {
        if (/^\d+$/.test(value) && /^(07)(?=[2-9])[0-9]{8}$/.test(value)) {
        } else {
          return "Numărul de telefon este invalid";
        }
        const raspuns = await axios.get(`${process.env.API_VALIDARE_TELEFON}?telefon=${value}`);
        if (raspuns.data > 0) {
          return "Acest număr de telefon există deja";
        }
      }
    },
    minLength: {
      value: 10,
      message: "Sunt necesare 10 cifre"
    },
    maxLength: {
      value: 10,
      message: "Numărul de cifre este prea mare"
    }
  },
  adresa: {
    required: "Adresa este obligatorie"
  },
  username: {
    required: "Nume utilizator este obligatoriu",
    minLength: { value: 8, message: "Minim 8 caractere" },
    validate: {
      validareUsername: async (value: string) => {
        const raspuns = await axios.get(`${process.env.API_VALIDARE_USERNAME}?username=${value}`);
        if (raspuns.data > 0) {
          return "Acest nume de utilizator există deja";
        }
      }
    }
  },
  email: {
    required: "Adresa de email este obligatorie",
    validate: {
      validareEmail: async (value: string) => {
        if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          return "Adresa de email este invalidă";
        }
        const raspuns = await axios.get(`${process.env.API_VALIDARE_EMAIL}?email=${value}`);
        if (raspuns.data > 0) {
          return "Acest email există deja";
        }
      }
    }
  },
  parola: { required: "Parola este obligatorie" },
  confirmareParola: {
    required: "Confirmarea este obligatorie",
    validate: {
      verificareParole: (value: string, values: FormFirma) => {
        if (value !== values.parola) {
          return "Parolele nu se potrivesc";
        }
      }
    }
  }
};
