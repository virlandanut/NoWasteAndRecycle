import { setareDatePrestabiliteFirma } from "../../../../../server/Utils/Functii/Functii_utilizatori.js";
import { FormFirma } from "../Interfete/Interfete.js";

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
