import { Contract_inchiriere, Prisma } from "@prisma/client";
import prisma from "../../../../Prisma/client.js";
import {
  datePdfInchirierePF,
  datePdfInchirierePJ,
} from "../../../../Servicii/Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import {
  getContainer,
  getUtilizator,
} from "../../ContractReciclare/CRUD/Read.js";
import { getFirma } from "../../../Utilizator/Firma/CRUD/Read.js";
import { getPersoanaFizica } from "../../../Utilizator/Persoana/CRUD/Read.js";

//luat
async function getContainerInchiriere(idContainer: number) {
  const containerInchiriere =
    await prisma.container_inchiriere_depozitare.findUnique({
      where: { id_container_depozitare: idContainer },
      include: {
        Utilizator: {
          include: {
            Localitate: true,
          },
        },
      },
    });

  if (!containerInchiriere) {
    throw new ExpressError(
      "Containerul de închiriere nu există în baza de date",
      500
    );
  }

  return containerInchiriere;
}

//luat
async function getContract(idContainer: number) {
  const contract = await prisma.contract_inchiriere.findUnique({
    where: { container: idContainer },
  });

  if (!contract) {
    throw new ExpressError(
      "Contractul de închiriere nu există în baza de date",
      500
    );
  }

  return contract;
}

//luat
export async function getDateNecesarePdfContractDepozitarePJ(
  idContainer: number
): Promise<datePdfInchirierePJ> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const containerInchiriere = await getContainerInchiriere(idContainer);
      const contract: Contract_inchiriere = await getContract(
        containerInchiriere.id_container_depozitare
      );
      const container = await getContainer(containerInchiriere.container);
      const proprietar = await getUtilizator(container.firma);
      const cumparator = await getFirma(
        containerInchiriere.Utilizator.id_utilizator
      );

      return {
        tipContainer: containerInchiriere.tip,
        proprietarDenumire: container.Firma.denumire_firma,
        cifProprietar: container.Firma.cif,
        judetProprietar: "Constanța",
        localitateProprietar: proprietar.Localitate.denumire_localitate,
        stradaProprietar: proprietar.strada,
        numarProprietar: proprietar.numar,
        cumparatorDenumire: cumparator.denumire_firma,
        cifCumparator: cumparator.cif,
        judetCumparator: "Constanța",
        localitateCumparator:
          containerInchiriere.Utilizator.Localitate.denumire_localitate,
        stradaCumparator: containerInchiriere.Utilizator.strada,
        numarCumparator: containerInchiriere.Utilizator.numar,
        judetContainer: "Constanța",
        localitateContainer: container.Localitate.denumire_localitate,
        stradaContainer: container.strada,
        numarContainer: container.numar,
        pretTotal: contract.pret.toString(),
        dataInceput: new Date(
          containerInchiriere.data_inceput
        ).toLocaleDateString("ro-RO"),
        dataSfarsit: new Date(
          containerInchiriere.data_sfarsit
        ).toLocaleDateString("ro-RO"),
      };
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientValidationError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "Datele necesare generării contractului de închiriere reciclare nu au putut fi interogate",
        500
      );
    }
  }
}

//luat
export async function getDateNecesarePdfContractDepozitarePF(
  idContainer: number
): Promise<datePdfInchirierePF> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const containerInchiriere = await getContainerInchiriere(idContainer);
      const contract: Contract_inchiriere = await getContract(
        containerInchiriere.id_container_depozitare
      );
      const container = await getContainer(containerInchiriere.container);
      const proprietar = await getUtilizator(container.firma);
      const cumparator = await getPersoanaFizica(
        containerInchiriere.Utilizator.id_utilizator
      );

      return {
        tipContainer: containerInchiriere.tip,
        proprietarDenumire: container.Firma.denumire_firma,
        cifProprietar: container.Firma.cif,
        judetProprietar: "Constanța",
        localitateProprietar: proprietar.Localitate.denumire_localitate,
        stradaProprietar: proprietar.strada,
        numarProprietar: proprietar.numar,
        cumparatorDenumire: `${cumparator.nume} ${cumparator.prenume}`,
        cnpCumparator: cumparator.cnp,
        judetCumparator: "Constanța",
        localitateCumparator:
          containerInchiriere.Utilizator.Localitate.denumire_localitate,
        stradaCumparator: containerInchiriere.Utilizator.strada,
        numarCumparator: containerInchiriere.Utilizator.numar,
        judetContainer: "Constanța",
        localitateContainer: container.Localitate.denumire_localitate,
        stradaContainer: container.strada,
        numarContainer: container.numar,
        pretTotal: contract.pret.toString(),
        dataInceput: new Date(
          containerInchiriere.data_inceput
        ).toLocaleDateString("ro-RO"),
        dataSfarsit: new Date(
          containerInchiriere.data_sfarsit
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
