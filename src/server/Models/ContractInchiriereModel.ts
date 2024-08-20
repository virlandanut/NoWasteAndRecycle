import { Contract_inchiriere } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";
import {
  datePdfInchirierePF,
  datePdfInchirierePJ,
} from "../Servicii/Interfete.js";
import { getContainerInchiriereLocalitate } from "./ContainerDepozitareModel.js";
import { getContainerCuFirmaLocalitate } from "./ContainerModel.js";
import { getUtilizatorCuLocalitate } from "./UtilizatorModel.js";
import { getFirma } from "./FirmaModel.js";
import { getPersoanaFizica } from "./PersoanaModel.js";

export async function getContractInchiriereDepozitare(
  id: number
): Promise<Contract_inchiriere> {
  const contract: Contract_inchiriere | null =
    await prisma.contract_inchiriere.findUnique({
      where: { container: id },
    });
  if (!contract) {
    throw new ExpressError("Contractul de închiriere nu există!", 500);
  }

  return contract;
}
export async function addContractInchiriere(
  id_container_depozitare: number,
  pret: number
): Promise<Contract_inchiriere | null> {
  return await prisma.contract_inchiriere.create({
    data: {
      container: id_container_depozitare,
      pret,
    },
  });
}

export async function getDateNecesarePdfContractDepozitarePJ(
  idContainer: number
): Promise<datePdfInchirierePJ> {
  return await prisma.$transaction(async (prisma) => {
    const containerInchiriere =
      await getContainerInchiriereLocalitate(idContainer);
    const contract: Contract_inchiriere = await getContractInchiriereDepozitare(
      containerInchiriere.id_container_depozitare
    );
    const container = await getContainerCuFirmaLocalitate(
      containerInchiriere.container
    );
    const proprietar = await getUtilizatorCuLocalitate(container.firma);
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
}

export async function getDateNecesarePdfContractDepozitarePF(
  idContainer: number
): Promise<datePdfInchirierePF> {
  return await prisma.$transaction(async (prisma) => {
    const containerInchiriere =
      await getContainerInchiriereLocalitate(idContainer);
    const contract: Contract_inchiriere = await getContractInchiriereDepozitare(
      containerInchiriere.id_container_depozitare
    );
    const container = await getContainerCuFirmaLocalitate(
      containerInchiriere.container
    );
    const proprietar = await getUtilizatorCuLocalitate(container.firma);
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
}
