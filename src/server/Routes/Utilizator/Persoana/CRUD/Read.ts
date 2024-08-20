import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import {
  DateExistentePersoana,
  DateInregistrariPersoane,
  Persoana,
} from "../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { Persoana_fizica, Prisma } from "@prisma/client";
import prisma from "../../../../Prisma/client.js";

//luat
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

//luat
export async function getNumarPersoaneInregistrate(): Promise<
  DateInregistrariPersoane[]
> {
  try {
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
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea datelor metrice ale persoanelor",
        500
      );
    }
  }
}
