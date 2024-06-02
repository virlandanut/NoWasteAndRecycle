export const verificareFormRaport = {
  titlu: {
    required: "Titlul este obligatoriu",
    minLength: { value: 8, message: "Minim 8 caractere" },
    maxLength: { value: 20, message: "Maxim 20 de caractere" },
  },
  mesaj: {
    required: "Descrierea este obligatorie",
    minLength: { value: 8, message: "Minim 8 caractere" },
    maxLength: { value: 20, message: "Maxim 20 de caractere" },
  },
};
