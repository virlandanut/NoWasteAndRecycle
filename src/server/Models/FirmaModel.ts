import { Firma } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { AdaugareFirmaPDO } from "../PDOs/AdaugareFirmaPDO.js";
import { ExpressError } from "../Utils/ExpressError.js";
import {
  DateInregistrariFirme,
  MetriciFirma,
} from "../Routes/Utilizator/Firma/Interfete.js";

export async function getFirma(idUtilizator: number) {
  const firma: Firma | null = await prisma.firma.findUnique({
    where: { id_utilizator: idUtilizator },
  });

  if (!firma) {
    throw new ExpressError("Firma nu există în baza de date", 500);
  }

  return firma;
}

export async function getFirmaCuId(id: number): Promise<Firma | null> {
  return await prisma.firma.findUnique({ where: { id_utilizator: id } });
}

export async function getNumarFirmeInregistrate(): Promise<
  DateInregistrariFirme[]
> {
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
}

export async function getToateFirmele(): Promise<MetriciFirma[]> {
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
}

export async function addFirma(
  id_utilizator: number,
  firma: AdaugareFirmaPDO,
  id_caen: number
): Promise<Firma> {
  return await prisma.firma.create({
    data: {
      id_utilizator,
      ...firma,
      caen: id_caen,
    },
  });
}

export async function setDrepturiFirma(
  id_utilizator: number,
  bifat: boolean
): Promise<void> {
  await prisma.firma.update({
    where: {
      id_utilizator,
    },
    data: {
      status_aprobare: bifat,
      data_aprobare: new Date(),
    },
  });
}

export async function updateFirma(
  id_utilizator: number,
  denumire_firma: string
): Promise<void> {
  await prisma.firma.update({
    where: { id_utilizator },
    data: {
      denumire_firma: denumire_firma,
    },
  });
}
