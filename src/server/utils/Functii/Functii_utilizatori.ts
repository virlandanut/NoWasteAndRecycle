import { Firma } from "../../Interfete/Interfete_Firma.js";
import { Persoana } from "../../Interfete/Interfete_Persoana.js";
import { Utilizator } from "../../Interfete/Interfete_Utilizator.js";
import { FormFirma } from "../../../client/views/InregistrareUtilizator/InregistrareFirma/Interfete/Interfete.js";
import { FormPersoana } from "../../../client/views/InregistrareUtilizator/InregistrarePersoana/Interfete/Interfete.js";

export const creareUtilizator = (formData: FormPersoana): Utilizator => {
  return {
    email: formData.email,
    nume_utilizator: formData.nume_utilizator,
    parola: formData.parola,
    data_inscriere: "",
    telefon: formData.telefon,
    strada: formData.strada,
    numar: formData.numar,
    localitate: formData.localitate,
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
    rol: "standard",
  };
  return data;
};

export const setareDatePrestabiliteFirma = (formData: FormFirma) => {
  const { confirmare_parola, ...newData } = formData;
  const data = {
    ...newData,
  };
  return data;
};
