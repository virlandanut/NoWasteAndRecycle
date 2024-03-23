import { FormFirma, FormPersoana, LoginValues } from "../../types";
import {
  setareDatePrestabiliteFirma,
  setareDatePrestabilitePersoana,
} from "../Utilizatori";

export const trimiteDatePersoana = async (
  FormData: FormPersoana,
  API: string
) => {
  const data = setareDatePrestabilitePersoana(FormData);
  const raspuns = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!raspuns.ok) {
    throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
  }
};
export const trimiteDateFirma = async (FormData: FormFirma, API: string) => {
  const data = setareDatePrestabiliteFirma(FormData);
  const raspuns = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!raspuns.ok) {
    throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
  }
};

export const trimiteDateAutentificare = async (
  data: LoginValues,
  API: string
) => {
  const raspuns = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!raspuns.ok) {
    throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
  }
};
