export const verificareFormRaport = {
  titlu: {
    required: "Titlul este obligatoriu",
    minLength: { value: 8, message: "Minim 8 caractere" },
    maxLength: { value: 50, message: "Maxim 50 de caractere" },
  },
  mesaj: {
    required: "Descrierea este obligatorie",
    minLength: { value: 40, message: "Minim 40 caractere" },
  },
};
