import {
  Container_inchiriere_depozitare,
  Container_inchiriere_reciclare,
  Contract_inchiriere,
  Contract_reciclare,
  Firma,
  Prisma,
} from "@prisma/client";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import prisma from "../../../../prisma/client.js";

export async function creazaContainerInchiriereReciclare(
  utilizator: number,
  container: number,
  data_inceput: string,
  data_sfarsit: string,
  lat: number,
  long: number,
  pret: number
): Promise<void> {
  try {
    await prisma.$transaction(async (prisma) => {
      const firma: Firma | null = await prisma.firma.findUnique({
        where: { id_utilizator: utilizator },
      });

      if (!firma) {
        throw new ExpressError(
          "Containerele de reciclare pot fi închiriate doar de persoanele juridice",
          500
        );
      }

      const containerNou: Container_inchiriere_reciclare | null =
        await prisma.container_inchiriere_reciclare.create({
          data: {
            firma: firma.id_utilizator,
            container,
            data_inceput,
            data_sfarsit,
            lat,
            long,
          },
        });

      if (!containerNou) {
        throw new ExpressError(
          "Containerul de depozitare nu a putut fi închiriat",
          500
        );
      }

      await prisma.container.update({
        where: { id_container: container },
        data: { status: true },
      });

      const contract: Contract_reciclare | null =
        await prisma.contract_reciclare.create({
          data: {
            container: containerNou.id_container_reciclare,
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
