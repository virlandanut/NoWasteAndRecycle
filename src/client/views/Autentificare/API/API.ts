import { FormAutentificare } from "../Interfete.js";

export const trimiteDateAutentificare = async (
  data: FormAutentificare,
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
