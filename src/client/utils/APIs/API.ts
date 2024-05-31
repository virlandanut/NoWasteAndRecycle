import { LoginValues } from "../../../interfaces/Interfete_Frontend";

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
