import {
  Container_inchiriere_depozitare,
  Contract_inchiriere,
} from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { addContractInchiriere } from "./ContractInchiriereModel.js";

export async function creazaContainerInchiriereReciclareMateriale(
  utilizator: number,
  container: number,
  data_inceput: string,
  data_sfarsit: string,
  tip: "FIX" | "MOBIL",
  pret: number
): Promise<void> {
  await prisma.$transaction(async (prisma) => {
    const containerNou: Container_inchiriere_depozitare | null =
      await prisma.container_inchiriere_depozitare.create({
        data: {
          utilizator,
          container,
          data_inceput,
          data_sfarsit,
          tip,
        },
      });

    if (!containerNou) {
      throw new ExpressError(
        "Containerul de depozitare nu a putut fi închiriat",
        500
      );
    }

    const contract: Contract_inchiriere | null = await addContractInchiriere(
      containerNou.id_container_depozitare,
      pret
    );

    if (!contract) {
      throw new ExpressError(
        "Contractul de închiriere nu a putut fi adăugat în baza de date",
        500
      );
    }
  });
}
