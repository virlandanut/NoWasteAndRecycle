import { datePdfReciclare } from "../../../../Servicii/Interfete.js";
import { Contract_reciclare, Prisma } from "@prisma/client";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import prisma from "../../../../Prisma/client.js";

//luat
async function getContainerReciclare(idContainer: number) {
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

//luat
async function getContract(idContainer: number) {
  const contract = await prisma.contract_reciclare.findUnique({
    where: { container: idContainer },
  });

  if (!contract) {
    throw new ExpressError(
      "Contractul de reciclare nu există în baza de date",
      500
    );
  }

  return contract;
}

//luat cu firma localitate container
export async function getContainer(idContainer: number) {
  const container = await prisma.container.findUnique({
    where: { id_container: idContainer },
    include: { Firma: true, Localitate: true },
  });

  if (!container) {
    throw new ExpressError("Containerul nu există în baza de date", 500);
  }

  return container;
}

//luat utilizatorModel.getUtilizatorCuLocalitate
export async function getUtilizator(idFirma: number) {
  const utilizator = await prisma.utilizator.findUnique({
    where: { id_utilizator: idFirma },
    include: { Localitate: true },
  });

  if (!utilizator) {
    throw new ExpressError("Utilizatorul nu există în baza de date", 500);
  }

  return utilizator;
}

//luat
export async function getDateNecesarePdfContractReciclare(
  idContainer: number
): Promise<datePdfReciclare> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const containerReciclare = await getContainerReciclare(idContainer);
      const contract: Contract_reciclare = await getContract(
        containerReciclare.id_container_reciclare
      );
      const container = await getContainer(containerReciclare.container);
      const proprietar = await getUtilizator(container.firma);
      const cumparator = await getUtilizator(containerReciclare.firma);

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
        dataInceput: new Date(
          containerReciclare.data_inceput
        ).toLocaleDateString("ro-RO"),
        dataSfarsit: new Date(
          containerReciclare.data_sfarsit
        ).toLocaleDateString("ro-RO"),
      };
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientValidationError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Datele necesare generării contractului de închiriere reciclare nu au putut fi interogate",
        500
      );
    }
  }
}
