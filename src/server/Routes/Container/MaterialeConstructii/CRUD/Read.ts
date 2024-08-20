import { ContainerMaterialeConstructii } from "../../../../../client/views/Container/ArataContainer/Constructii/Interfete.js";
import { MetriceContainere, PretContainer } from "../../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../../Prisma/client.js";
import { getPreturiContainer } from "../../CRUD/Read.js";

//luat
export async function getContainereMaterialeConstructii(): Promise<
  ContainerMaterialeConstructii[]
> {
  try {
    const containere = await prisma.container.findMany({
      where: {
        Tip_container: {
          some: {
            tip_deseu: 8,
          },
        },
        Firma: {
          status_aprobare: true,
        },
      },
      include: {
        Firma: true,
        Localitate: true,
        Container_inchiriere: true,
      },
    });

    if (!containere) {
      throw new ExpressError(
        "Nu există niciun container de depozitare în baza de date",
        500
      );
    }

    const containereMateriale: ContainerMaterialeConstructii[] =
      await Promise.all(
        containere.map(async (container) => {
          const preturi: PretContainer[] = await getPreturiContainer(
            container.id_container
          );
          const pretZi =
            preturi.find((p) => p.denumire_tip_pret === "Zi")?.pret || 0;
          const pretSaptamana =
            preturi.find((p) => p.denumire_tip_pret === "Săptămână")?.pret || 0;
          const pretLuna =
            preturi.find((p) => p.denumire_tip_pret === "Lună")?.pret || 0;
          const pretAn =
            preturi.find((p) => p.denumire_tip_pret === "An")?.pret || 0;

          return {
            id_container: container.id_container,
            denumire: container.denumire,
            capacitate: container.capacitate,
            status: container.status,
            strada: container.strada,
            numar: container.numar,
            latitudine: container.lat,
            longitudine: container.long,
            localitate: container.Localitate.denumire_localitate,
            firma: container.firma,
            poza: container.poza,
            denumire_firma: container.Firma.denumire_firma,
            status_aprobare: container.Firma.status_aprobare,
            descriere: container.descriere,
            data_inceput: container.Container_inchiriere[0]
              ? container.Container_inchiriere[0].data_inceput
              : null,
            data_sfarsit: container.Container_inchiriere[0]
              ? container.Container_inchiriere[0].data_sfarsit
              : null,
            pretZi,
            pretSaptamana,
            pretLuna,
            pretAn,
          };
        })
      );

    return containereMateriale;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientInitializationError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la interogarea containerelor de închiriere",
        500
      );
    }
  }
}

//luat
export async function getContainerMaterialeConstructii(
  id_container: number
): Promise<ContainerMaterialeConstructii> {
  try {
    const container = await prisma.container.findUnique({
      where: { id_container, Tip_container: { some: { tip_deseu: 8 } } },
      include: {
        Firma: true,
        Localitate: true,
        Tip_container: { include: { Tip_deseu: true } },
        Container_inchiriere: true,
      },
    });
    if (!container) {
      throw new ExpressError(
        "Containerul de reciclare a materialelor nu a fost găsit!",
        500
      );
    }
    const containerMaterialeConstructii: ContainerMaterialeConstructii = {
      id_container: container.id_container,
      denumire: container.denumire,
      capacitate: container.capacitate,
      status: container.status,
      strada: container.strada,
      numar: container.numar,
      latitudine: container.lat,
      longitudine: container.long,
      localitate: container.Localitate.denumire_localitate,
      firma: container.firma,
      poza: container.poza,
      denumire_firma: container.Firma.denumire_firma,
      status_aprobare: container.Firma.status_aprobare,
      descriere: container.descriere,
      data_inceput: container.Container_inchiriere[0]
        ? container.Container_inchiriere[0].data_inceput
        : null,
      data_sfarsit: container.Container_inchiriere[0]
        ? container.Container_inchiriere[0].data_sfarsit
        : null,
    };
    return containerMaterialeConstructii;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Containerul de reciclare a materialelor nu a putut fi interogat",
        500
      );
    }
  }
}

//luat
export async function getContainereMaterialeSapt(): Promise<
  MetriceContainere[]
> {
  try {
    const rezultat = await prisma.$queryRaw<MetriceContainere[]>`
    SELECT
          COUNT(c.id_container) AS numarContainere, d.data_adaugare
    FROM 
          (
            SELECT
                CURDATE() - INTERVAL 7 DAY AS data_adaugare UNION ALL
                SELECT CURDATE() - INTERVAL 5 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 4 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 3 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 2 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 1 DAY UNION ALL
                SELECT CURDATE()
          ) AS d
    LEFT JOIN
          Container c ON d.data_adaugare = DATE(c.data_adaugare) AND c.id_container IN (SELECT container FROM Tip_container WHERE tip_deseu = 8)
    GROUP BY
          d.data_adaugare;
    `;

    const rezultatFormatat = rezultat.map((record) => ({
      numarContainere: Number(record.numarContainere),
      data_adaugare: record.data_adaugare,
    }));
    return rezultatFormatat;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Metricele containerelor de materiale nu au putut fi obținute de la baza de date",
        500
      );
    }
  }
}
