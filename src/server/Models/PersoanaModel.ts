import { Persoana_fizica, Utilizator } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { AdaugarePersoanaPDO } from "../PDOs/AdaugarePersoanaPDO.js";
import { UpdatePersoanaPDO } from "../PDOs/UpdatePersoanaPDO.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { DateInregistrariPersoane } from "../Routes/Utilizator/Persoana/Interfete.js";

export async function getPersoanaFizica(idUtilizator: number) {
  const persoana: Persoana_fizica | null =
    await prisma.persoana_fizica.findUnique({
      where: { id_utilizator: idUtilizator },
    });

  if (!persoana) {
    throw new ExpressError("Persoana nu există în baza de date", 500);
  }

  return persoana;
}

export async function getNumarPersoaneInregistrate(): Promise<
  DateInregistrariPersoane[]
> {
  const rezultat = await prisma.$queryRaw<
    { numarPersoane: number; data_inscriere: Date }[]
  >`
   SELECT 
        COALESCE(COUNT(p.id_utilizator), 0) AS numarPersoane,
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
        Persoana_fizica p ON u.id_utilizator = p.id_utilizator
   GROUP BY
        d.data_inscriere
   `;
  const dateInregistrariFirme: DateInregistrariPersoane[] = rezultat.map(
    (item) => ({
      numarPersoane: Number(item.numarPersoane),
      data_inscriere: item.data_inscriere,
    })
  );
  return dateInregistrariFirme;
}

export async function addPersoana(
  id_utilizator: number,
  persoana: AdaugarePersoanaPDO
): Promise<Persoana_fizica> {
  return await prisma.persoana_fizica.create({
    data: {
      id_utilizator,
      ...persoana,
    },
  });
}

export async function updatePersoana(
  id_utilizator: number,
  data: UpdatePersoanaPDO
): Promise<void> {
  await prisma.persoana_fizica.update({
    where: { id_utilizator },
    data: {
      nume: data.nume,
      prenume: data.prenume,
    },
  });
}
