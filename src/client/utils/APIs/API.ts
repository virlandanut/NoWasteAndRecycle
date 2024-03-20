import { LoginValues } from "../../types";
import { setareDatePrestabilite } from "../Utilizatori";

export const trimiteCatreServer = async (FormData: any, API: string) => {
  const data = setareDatePrestabilite(FormData);
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
