import { DateInregistrariFirme, MetriciFirma } from "../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import prisma from "../../../../Prisma/client.js";
import { Firma, Prisma } from "@prisma/client";

//luat
export async function getFirma(idUtilizator: number) {
  const firma: Firma | null = await prisma.firma.findUnique({
    where: { id_utilizator: idUtilizator },
  });

  if (!firma) {
    throw new ExpressError("Firma nu există în baza de date", 500);
  }

  return firma;
}

//luat
export async function getToateFirmele(): Promise<MetriciFirma[]> {
  try {
    const firme = await prisma.firma.findMany({
      select: {
        id_utilizator: true,
        cif: true,
        denumire_firma: true,
        status_aprobare: true,
        utilizator: {
          select: {
            data_inscriere: true,
            email: true,
          },
        },
      },
    });
    return firme.map((firma) => ({
      id_utilizator: firma.id_utilizator,
      cif: firma.cif,
      denumire_firma: firma.denumire_firma,
      data_inscriere: firma.utilizator.data_inscriere,
      email: firma.utilizator.email,
      status_aprobare: firma.status_aprobare,
    }));
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la modificarea datelor firmei",
        500
      );
    }
  }
}

//luat
export async function getNumarFirmeInregistrate(): Promise<
  DateInregistrariFirme[]
> {
  try {
    const rezultat = await prisma.$queryRaw<
      { numarFirme: number; data_inscriere: Date }[]
    >`
   SELECT 
        COALESCE(COUNT(f.id_utilizator), 0) AS numarFirme,
        d.data_inscriere AS data_inscriere
   FROM 
      (
        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) AS data_inscriere UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) UNION ALL
        SELECT CURDATE()
      ) AS d
   LEFT JOIN 
        Utilizator u ON DATE(u.data_inscriere) = d.data_inscriere
   LEFT JOIN 
        Firma f ON u.id_utilizator = f.id_utilizator
   GROUP BY
        d.data_inscriere
   `;
    const dateInregistrariFirme: DateInregistrariFirme[] = rezultat.map(
      (item) => ({
        numarFirme: Number(item.numarFirme),
        data_inscriere: item.data_inscriere,
      })
    );
    return dateInregistrariFirme;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la modificarea datelor firmei",
        500
      );
    }
  }
}
