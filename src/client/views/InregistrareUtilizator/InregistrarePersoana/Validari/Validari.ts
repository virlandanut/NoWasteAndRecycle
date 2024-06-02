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
