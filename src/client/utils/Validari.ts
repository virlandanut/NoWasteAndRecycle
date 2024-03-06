export type FormValues = {
  nume: string;
  prenume: string;
  CNP: string;
  telefon: string;
  adresa: string;
  username: string;
  email: string;
  parola: string;
  confirmareParola: string;
};

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
  },
  telefon: {
    required: "Numărul de telefon este obligatoriu",
    validate: {
      validareTelefon: (value: string) => {
        if (/^\d+$/.test(value) && /^(07)(?=[2-9])[0-9]{8}$/.test(value)) {
        } else {
          return "Numărul de telefon este invalid";
        }
      },
    },
    minLength: {
      value: 10,
      message: "Sunt necesare 10 cifre",
    },
  },
  adresa: { required: "Adresa este obligatorie" },
  username: { required: "Nume utilizator este obligatoriu" },
  email: { required: "Adresa de email este obligatorie" },
  parola: { required: "Parola este obligatorie" },
  confirmareParola: { required: "Confirmarea este obligatorie" },
};
