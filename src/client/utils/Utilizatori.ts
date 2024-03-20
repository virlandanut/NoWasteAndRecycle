import { Firma, Persoana, Utilizator } from "../../../interfaces";
import { FormFirma, FormPersoana } from "../types";
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

export const creareUtilizator = (formData: FormPersoana): Utilizator => {
  return {
    email: formData.email,
    username: formData.username,
    parola: formData.parola,
    dataInscriere: formData.dataInscriere,
    telefon: formData.telefon,
    adresa: formData.adresa,
  };
};

export const crearePersoana = (formData: FormPersoana): Persoana => {
  return {
    nume: formData.nume,
    prenume: formData.prenume,
    CNP: formData.CNP,
    rol: "standard",
  };
};

export const creareFirma = (formData: FormFirma): Firma => {
  return {
    denumire: formData.denumire,
    cif: formData.cif,
    caen: formData.caen,
  };
};

export const setareDatePrestabilite = (formData: FormPersoana | FormFirma) => {
  const { confirmareParola, ...newData } = formData;
  const data = {
    ...newData,
    dataInscriere: new Date(moment().format("YYYY/MM/D")),
    rol: "standard",
  };
  return data;
};

