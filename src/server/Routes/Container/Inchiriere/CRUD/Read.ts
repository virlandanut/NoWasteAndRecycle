import { ContainerInchiriere } from "../../../../../client/views/Container/ArataContainer/Depozitare/Interfete.js";
import { MetriceContainere, PretContainer } from "../../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import {
  Container_inchiriere_depozitare,
  Contract_inchiriere,
  Prisma,
} from "@prisma/client";
import prisma from "../../../../Prisma/client.js";
import {
  ContainerInchiriereDepozitareCuRelatii,
  RecenzieContainer,
} from "../Interfete.js";
import { getPreturiContainer } from "../../CRUD/Read.js";

//luat
export async function getContainereInchiriere(): Promise<
  ContainerInchiriere[]
> {
  try {
    const containere = await prisma.container.findMany({
      where: {
        Tip_container: {
          none: {},
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

    const containereInchiriere: ContainerInchiriere[] = await Promise.all(
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
          poza: container.poza,
          localitate: container.Localitate.denumire_localitate,
          firma: container.firma,
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

    return containereInchiriere;
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
export async function getContainerInchiriere(
  id_container: number
): Promise<ContainerInchiriere> {
  try {
    const container = await prisma.container.findUnique({
      where: { id_container, Tip_container: { none: {} } },
      include: { Firma: true, Localitate: true, Container_inchiriere: true },
    });
    if (!container) {
      throw new ExpressError("Containerul de depozitare nu a fost găsit", 500);
    }

    const containerInchiriere: ContainerInchiriere = {
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

    return containerInchiriere;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Containerul de depozitare nu a putut fi obținut din baza de date",
        500
      );
    }
  }
}

export async function getContainereInchiriereSapt(): Promise<
  MetriceContainere[]
> {
  try {
    const rezultat = await prisma.$queryRaw<MetriceContainere[]>`
    SELECT 
          IFNULL(COUNT(c.id_container), 0) AS numarContainere, d.data_adaugare
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
          Container c ON d.data_adaugare = DATE(c.data_adaugare) AND c.id_container NOT IN (SELECT container FROM Tip_container)
      GROUP BY 
          d.data_adaugare`;

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
        "Au existat probleme la interogarea numărului de containere de depozitare de săptămâna trecută",
        500
      );
    }
  }
}

//luat
export async function getContainereInchiriereInchirieri(
  id: number
): Promise<Container_inchiriere_depozitare[]> {
  try {
    const containereDepozitare: Container_inchiriere_depozitare[] =
      await prisma.container_inchiriere_depozitare.findMany({
        where: { container: id },
      });

    return containereDepozitare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Închirierile containerului de reciclare nu au putut fi interogate",
        500
      );
    }
  }
}

//luat
export async function getContainereInchiriereInchirieriDateCompleteFirma(
  id: number
): Promise<ContainerInchiriereDepozitareCuRelatii[]> {
  try {
    const containereDepozitare: ContainerInchiriereDepozitareCuRelatii[] =
      await prisma.container_inchiriere_depozitare.findMany({
        where: { Container: { firma: id } },
        include: {
          Utilizator: true,
          Container: true,
        },
      });
    return containereDepozitare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Închirierile containerului de reciclare nu au putut fi interogate",
        500
      );
    }
  }
}

//luat
export async function getContainereInchiriereInchirieriDateComplete(
  id: number
): Promise<ContainerInchiriereDepozitareCuRelatii[]> {
  try {
    const containereDepozitare: ContainerInchiriereDepozitareCuRelatii[] =
      await prisma.container_inchiriere_depozitare.findMany({
        where: { Utilizator: { id_utilizator: id } },
        include: {
          Utilizator: true,
          Container: true,
        },
      });

    return containereDepozitare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Închirierile containerului de reciclare nu au putut fi interogate",
        500
      );
    }
  }
}

//luat
export async function getContractInchiriereDepozitare(
  id: number
): Promise<Contract_inchiriere> {
  try {
    const contract: Contract_inchiriere | null =
      await prisma.contract_inchiriere.findUnique({ where: { container: id } });
    if (!contract) {
      throw new ExpressError("Contractul de închiriere nu există!", 500);
    }

    return contract;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Contractul de depozitare nu a putut fi interogat",
        500
      );
    }
  }
}

//null
export async function getRatingContainer(id: number): Promise<number | null> {
  try {
    const rating = await prisma.recenzie.aggregate({
      where: {
        Container_inchiriere: {
          container: id,
        },
      },
      _avg: {
        scor: true,
      },
    });
    return rating._avg.scor;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError("Ratingul nu a putut fi interogat", 500);
    }
  }
}

//luat
export async function getNumarRecenzii(id: number): Promise<number | null> {
  try {
    const rating = await prisma.recenzie.aggregate({
      where: {
        Container_inchiriere: {
          container: id,
        },
      },
      _count: {
        id_recenzie: true,
      },
    });
    return rating._count.id_recenzie;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError("Ratingul nu a putut fi interogat", 500);
    }
  }
}

//luat
export async function getRecenzii(id: number): Promise<RecenzieContainer[]> {
  try {
    const recenzii: RecenzieContainer[] = await prisma.recenzie.findMany({
      where: { Container_inchiriere: { container: id } },
      include: {
        Container_inchiriere: {
          include: {
            Utilizator: true,
          },
        },
      },
    });
    return recenzii;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError("Ratingul nu a putut fi interogat", 500);
    }
  }
}
