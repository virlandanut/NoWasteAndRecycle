import { setareDatePrestabilitePersoana } from "../../../../../server/utils/Functii/Functii_utilizatori.js";
import { FormPersoana } from "../Interfete/Interfete.js";

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
