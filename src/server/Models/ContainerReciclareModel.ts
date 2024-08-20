import {
  Container_inchiriere_reciclare,
  Contract_reciclare,
  Firma,
} from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ContainerInchiriereReciclareCuRelatii } from "../Routes/Container/Reciclare/Interfete.js";
import { MetriceContainere } from "../Routes/Container/Interfete.js";
import { getFirmaCuId } from "./FirmaModel.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { datePdfReciclare } from "../Servicii/Interfete.js";
import {
  addContractReciclare,
  getContractInchiriereReciclare,
} from "./ContractReciclareModel.js";
import { getUtilizatorCuLocalitate } from "./UtilizatorModel.js";

export async function getContainerReciclare(idContainer: number) {
  const containerReciclare =
    await prisma.container_inchiriere_reciclare.findUnique({
      where: { id_container_reciclare: idContainer },
      include: {
        Firma: true,
      },
    });

  if (!containerReciclare) {
    throw new ExpressError(
      "Containerul de reciclare nu există în baza de date",
      500
    );
  }

  return containerReciclare;
}

export async function getInchirieriContainerReciclare(
  id: number
): Promise<Container_inchiriere_reciclare[]> {
  const containereReciclare: Container_inchiriere_reciclare[] =
    await prisma.container_inchiriere_reciclare.findMany({
      where: { container: id },
    });

  return containereReciclare;
}
export async function deleteContainerReciclare(id: number): Promise<void> {
  await prisma.container_inchiriere_reciclare.deleteMany({
    where: { container: id },
  });
}

export async function getInchirieriContainerReciclareCompleteFirma(
  id: number
): Promise<ContainerInchiriereReciclareCuRelatii[]> {
  const containereReciclare: ContainerInchiriereReciclareCuRelatii[] =
    await prisma.container_inchiriere_reciclare.findMany({
      where: { Container: { firma: id } },
      include: {
        Firma: true,
        Container: true,
      },
    });

  return containereReciclare;
}

export async function getInchirieriContainerReciclareDateComplete(
  denumire_firma: string
): Promise<ContainerInchiriereReciclareCuRelatii[]> {
  const containereReciclare: ContainerInchiriereReciclareCuRelatii[] =
    await prisma.container_inchiriere_reciclare.findMany({
      where: { Firma: { denumire_firma } },
      include: {
        Firma: true,
        Container: true,
      },
    });

  return containereReciclare;
}

export async function getContainereReciclareSapt(): Promise<
  MetriceContainere[]
> {
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
          Container c
          ON d.data_adaugare = DATE(c.data_adaugare) AND c.id_container IN (SELECT container FROM Tip_container WHERE tip_deseu <> 8)
    GROUP BY
          d.data_adaugare;
    `;
  const rezultatFormatat = rezultat.map((record) => ({
    numarContainere: Number(record.numarContainere),
    data_adaugare: record.data_adaugare,
  }));

  return rezultatFormatat;
}

export async function creazaContainerInchiriereReciclare(
  utilizator: number,
  container: number,
  data_inceput: string,
  data_sfarsit: string,
  lat: number,
  long: number,
  pret: number
): Promise<void> {
  await prisma.$transaction(async (prisma) => {
    const firma: Firma | null = await getFirmaCuId(utilizator);

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

    const contract: Contract_reciclare | null = await addContractReciclare(
      containerNou.id_container_reciclare,
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

async function getContainer(idContainer: number) {
  const container = await prisma.container.findUnique({
    where: { id_container: idContainer },
    include: { Firma: true, Localitate: true },
  });

  if (!container) {
    throw new ExpressError("Containerul nu există în baza de date", 500);
  }

  return container;
}

export async function getDateNecesarePdfContractReciclare(
  idContainer: number
): Promise<datePdfReciclare> {
  return await prisma.$transaction(async (prisma) => {
    const containerReciclare = await getContainerReciclare(idContainer);
    const contract: Contract_reciclare = await getContractInchiriereReciclare(
      containerReciclare.id_container_reciclare
    );
    const container = await getContainer(containerReciclare.container);
    const proprietar = await getUtilizatorCuLocalitate(container.firma);
    const cumparator = await getUtilizatorCuLocalitate(
      containerReciclare.firma
    );

    return {
      proprietarDenumire: container.Firma.denumire_firma,
      cifProprietar: container.Firma.cif,
      judetProprietar: "Constanța",
      localitateProprietar: proprietar.Localitate.denumire_localitate,
      stradaProprietar: proprietar.strada,
      numarProprietar: proprietar.numar,
      cumparatorDenumire: containerReciclare.Firma.denumire_firma,
      cifCumparator: containerReciclare.Firma.cif,
      judetCumparator: "Constanța",
      localitateCumparator: cumparator.Localitate.denumire_localitate,
      stradaCumparator: cumparator.strada,
      numarCumparator: cumparator.numar,
      judetContainer: "Constanța",
      localitateContainer: container.Localitate.denumire_localitate,
      stradaContainer: container.strada,
      numarContainer: container.numar,
      pretTotal: contract.pret.toString(),
      dataInceput: new Date(containerReciclare.data_inceput).toLocaleDateString(
        "ro-RO"
      ),
      dataSfarsit: new Date(containerReciclare.data_sfarsit).toLocaleDateString(
        "ro-RO"
      ),
    };
  });
}
