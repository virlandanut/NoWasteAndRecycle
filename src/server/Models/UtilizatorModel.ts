import prisma from "../Prisma/client.js";
import bcrypt from "bcrypt";
import { Rol, Utilizator } from "@prisma/client";
import { UpdateUtilizatorPDO } from "../PDOs/UpdateUtilizatorPDO.js";
import { AdaugareUtilizatorPDO } from "../PDOs/AdaugareUtilizatorPDO.js";
import { DateCompleteFirmaPDO } from "../PDOs/DateCompleteFirmaPDO.js";
import { DateCompletePersoanaPDO } from "../PDOs/DateCompletePersoanaPDO.js";
import { ExpressError } from "../Utils/ExpressError.js";

export async function getUtilizatorCuId(
  id: number
): Promise<Utilizator | null> {
  return await prisma.utilizator.findUnique({
    where: { id_utilizator: id },
    include: { Localitate: true },
  });
}

export async function getUtilizatorCuEmailSiNumeUtilizator(
  nume_utilizator: string,
  email: string
): Promise<Utilizator | null> {
  return await prisma.utilizator.findUnique({
    where: { email, AND: { nume_utilizator } },
  });
}

export async function getUtilizatorCuNumeUtilizator(
  nume_utilizator: string
): Promise<Utilizator | null> {
  return await prisma.utilizator.findUnique({
    where: { nume_utilizator },
    include: { Localitate: true },
  });
}

export async function getUtilizatorCuLocalitate(idFirma: number) {
  const utilizator = await prisma.utilizator.findUnique({
    where: { id_utilizator: idFirma },
    include: { Localitate: true },
  });

  if (!utilizator) {
    throw new ExpressError("Utilizatorul nu există în baza de date", 500);
  }

  return utilizator;
}

export async function getNumarUtilizatori(): Promise<number> {
  const rezultat = await prisma.utilizator.count({
    where: {
      data_inscriere: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  return rezultat;
}

export async function getMedieUtilizatori(): Promise<number> {
  const utilizatoriPeZile = await prisma.$queryRaw<
    { numarUtilizatori: number; data_inscriere: Date }[]
  >`
    SELECT 
        COUNT(u.id_utilizator) AS numarUtilizatori,
        d.data_inscriere
    FROM  
      (
        SELECT DATE_SUB(CURDATE(), INTERVAL 7 DAY) AS data_inscriere UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) 
      ) AS d
    LEFT JOIN Utilizator u
      ON DATE(u.data_inscriere) = d.data_inscriere
    GROUP BY
      d.data_inscriere;
    `;

  const totalUtilizatori = utilizatoriPeZile.reduce(
    (sum, row) => sum + Number(row.numarUtilizatori),
    0
  );
  const medieUtilizatoriSaptamana = totalUtilizatori / utilizatoriPeZile.length;

  return medieUtilizatoriSaptamana;
}

export async function addUtilizator(
  utilizator: AdaugareUtilizatorPDO,
  rol: Rol,
  id_localitate: number
): Promise<Utilizator> {
  return await prisma.utilizator.create({
    data: {
      ...utilizator,
      localitate: id_localitate,
      rol,
    },
  });
}

export async function getUtilizatorTichet(id_utilizator: number) {
  return await prisma.utilizator.findUnique({
    where: { id_utilizator },
    include: {
      Persoana_fizica: {
        select: { nume: true, prenume: true },
      },
      Firma: {
        select: { denumire_firma: true },
      },
    },
  });
}

export async function updateParola(
  id_utilizator: number,
  parola_noua: string
): Promise<Utilizator> {
  const parolaCriptata = await bcrypt.hash(parola_noua, 10);
  return await prisma.utilizator.update({
    where: { id_utilizator },
    data: { parola: parolaCriptata },
  });
}

export async function updatePozaProfil(
  id_utilizator: number,
  url: string
): Promise<Utilizator> {
  return await prisma.utilizator.update({
    where: { id_utilizator },
    data: { poza: url },
  });
}

export async function updateUtilizator(
  id_utilizator: number,
  data: UpdateUtilizatorPDO,
  id_localitate: number
): Promise<Utilizator> {
  return await prisma.utilizator.update({
    where: { id_utilizator },
    data: {
      email: data.email,
      nume_utilizator: data.nume_utilizator,
      telefon: data.telefon,
      strada: data.strada,
      numar: data.numar,
      localitate: id_localitate,
    },
  });
}

export async function getDateCompletePJ(
  id: number
): Promise<DateCompleteFirmaPDO | null> {
  const utilizator = await prisma.utilizator.findUnique({
    where: { id_utilizator: id },
    select: {
      email: true,
      nume_utilizator: true,
      telefon: true,
      strada: true,
      numar: true,
      Firma: {
        select: {
          denumire_firma: true,
        },
      },
      Localitate: {
        select: {
          denumire_localitate: true,
        },
      },
    },
  });
  if (!utilizator || !utilizator.Firma || !utilizator.Localitate) {
    return null;
  }

  return {
    denumire_firma: utilizator.Firma.denumire_firma,
    email: utilizator.email,
    nume_utilizator: utilizator.nume_utilizator,
    telefon: utilizator.telefon,
    strada: utilizator.strada,
    numar: utilizator.numar,
    localitate: utilizator.Localitate.denumire_localitate,
  };
}

export async function getDatePersoana(
  id_utilizator: number
): Promise<DateCompletePersoanaPDO | null> {
  const utilizator = await prisma.utilizator.findUnique({
    where: { id_utilizator },
    select: {
      email: true,
      nume_utilizator: true,
      telefon: true,
      strada: true,
      numar: true,
      Persoana_fizica: {
        select: {
          nume: true,
          prenume: true,
        },
      },
      Localitate: {
        select: {
          denumire_localitate: true,
        },
      },
    },
  });
  if (!utilizator || !utilizator.Persoana_fizica || !utilizator.Localitate) {
    return null;
  }

  return {
    nume: utilizator.Persoana_fizica.nume,
    prenume: utilizator.Persoana_fizica.prenume,
    email: utilizator.email,
    nume_utilizator: utilizator.nume_utilizator,
    telefon: utilizator.telefon,
    strada: utilizator.strada,
    numar: utilizator.numar,
    localitate: utilizator.Localitate.denumire_localitate,
  };
}
