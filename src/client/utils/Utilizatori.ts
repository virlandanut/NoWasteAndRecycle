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
    nume_utilizator: formData.nume_utilizator,
    parola: formData.parola,
    data_inscriere: formData.data_inscriere,
    telefon: formData.telefon,
    adresa: formData.adresa,
  };
};

export const crearePersoana = (formData: FormPersoana): Persoana => {
  return {
    nume: formData.nume,
    prenume: formData.prenume,
    cnp: formData.cnp,
    rol: "standard",
  };
};

export const creareFirma = (formData: FormFirma): Firma => {
  return {
    denumire_firma: formData.denumire_firma,
    cif: formData.cif,
    caen: parseInt(formData.caen),
  };
};

export const setareDatePrestabilitePersoana = (formData: FormPersoana) => {
  const { confirmare_parola, ...newData } = formData;
  const data = {
    ...newData,
    data_inscriere: new Date(moment().format("YYYY/MM/D")),
    rol: "standard",
  };
  return data;
};

export const setareDatePrestabiliteFirma = (formData: FormFirma) => {
  const { confirmare_parola, ...newData } = formData;
  const data = {
    ...newData,
    data_inscriere: new Date(moment().format("YYYY/MM/D")),
  };
  return data;
};
