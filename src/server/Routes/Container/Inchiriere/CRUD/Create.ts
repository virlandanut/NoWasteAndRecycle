import {
  Container_inchiriere_depozitare,
  Contract_inchiriere,
  Prisma,
} from "@prisma/client";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import prisma from "../../../../Prisma/client.js";
import { Dayjs } from "dayjs";

export async function creazaContainerInchiriereDepozitare(
  utilizator: number,
  container: number,
  data_inceput: string,
  data_sfarsit: string,
  lat: number,
  long: number,
  tip: "FIX" | "MOBIL",
  pret: number
): Promise<void> {
  try {
    await prisma.$transaction(async (prisma) => {
      const containerNou: Container_inchiriere_depozitare | null =
        await prisma.container_inchiriere_depozitare.create({
          data: {
            utilizator,
            container,
            data_inceput,
            data_sfarsit,
            lat,
            long,
            tip,
          },
        });

      if (!containerNou) {
        throw new ExpressError(
          "Containerul de depozitare nu a putut fi închiriat",
          500
        );
      }

      const contract: Contract_inchiriere =
        await prisma.contract_inchiriere.create({
          data: {
            container: containerNou.id_container_depozitare,
            pret,
          },
        });

      if (!contract) {
        throw new ExpressError(
          "Contractul de închiriere nu a putut fi adăugat în baza de date",
          500
        );
      }
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "Containerul nu a putut fi adăugat în baza de date",
        500
      );
    }
  }
}
