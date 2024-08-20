import { Firma } from "@prisma/client";
import { getInchirieriContainerReciclareDateComplete } from "../Routes/Container/Reciclare/CRUD/Read.js";
import { getContainereInchiriereInchirieriDateComplete } from "../Routes/Container/Inchiriere/CRUD/Read.js";

export async function getInchirieriFirma(firma: Firma) {
  const containereReciclare = await getInchirieriContainerReciclareDateComplete(
    firma.denumire_firma
  );
  const containereDepozitare =
    await getContainereInchiriereInchirieriDateComplete(firma.id_utilizator);

  return { containereReciclare, containereDepozitare };
}

export async function getInchirieriUtilizator(id_utilizator: number) {
  const containereDepozitare =
    await getContainereInchiriereInchirieriDateComplete(id_utilizator);
  return { containereReciclare: [], containereDepozitare };
}
