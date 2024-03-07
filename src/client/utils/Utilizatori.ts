import { Persoana, Utilizator } from "../../server/interfaces";
import { FormValues } from "./Validari";
import moment from "moment";

export const getUtilizatori = async () => {
  try {
    const response = await fetch(process.env.API_BASE + "/api/utilizatori");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const verificareParola = (parola: string, confirmare: string) => {
  return parola === confirmare;
};

export const creareUtilizator = (formData: FormValues): Utilizator => {
  return {
    email: formData.email,
    username: formData.username,
    parola: formData.parola,
    dataInscriere: new Date(moment().format("YYYY/MM/D")),
    telefon: formData.telefon,
    adresa: formData.adresa,
  };
};

export const crearePersoana = (formData: FormValues): Persoana => {
  return {
    nume: formData.nume,
    prenume: formData.prenume,
    CNP: formData.CNP,
    rol: "standard",
  };
};
