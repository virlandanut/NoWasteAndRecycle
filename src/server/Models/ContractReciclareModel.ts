import { Contract_reciclare } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { datePdfReciclare } from "../Servicii/Interfete.js";
import { getContainerReciclare } from "./ContainerReciclareModel.js";
import { getUtilizatorCuLocalitate } from "./UtilizatorModel.js";

export async function getContractInchiriereReciclare(
  id: number
): Promise<Contract_reciclare> {
  const contract: Contract_reciclare | null =
    await prisma.contract_reciclare.findUnique({ where: { container: id } });
  if (!contract) {
    throw new ExpressError("Contractul de reciclare nu există", 500);
  }
  return contract;
}

export async function addContractReciclare(
  id_container_reciclare: number,
  pret: number
): Promise<Contract_reciclare | null> {
  return await prisma.contract_reciclare.create({
    data: {
      container: id_container_reciclare,
      pret,
    },
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
