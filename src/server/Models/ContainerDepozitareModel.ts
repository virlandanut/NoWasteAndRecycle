import {
  Container_inchiriere_depozitare,
  Contract_inchiriere,
} from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { ContainerInchiriereDepozitareCuRelatii } from "../Routes/Container/Inchiriere/Interfete.js";
import { addContractInchiriere } from "./ContractInchiriereModel.js";

export async function getContainerInchiriereLocalitate(idContainer: number) {
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

export async function getContainereInchiriereInchirieri(
  id: number
): Promise<Container_inchiriere_depozitare[]> {
  const containereDepozitare: Container_inchiriere_depozitare[] =
    await prisma.container_inchiriere_depozitare.findMany({
      where: { container: id },
    });

  return containereDepozitare;
}

export async function getContainereInchiriereInchirieriDateCompleteFirma(
  id: number
): Promise<ContainerInchiriereDepozitareCuRelatii[]> {
  const containereDepozitare: ContainerInchiriereDepozitareCuRelatii[] =
    await prisma.container_inchiriere_depozitare.findMany({
      where: { Container: { firma: id } },
      include: {
        Utilizator: true,
        Container: true,
      },
    });
  return containereDepozitare;
}

export async function getContainereInchiriereInchirieriDateComplete(
  id: number
): Promise<ContainerInchiriereDepozitareCuRelatii[]> {
  const containereDepozitare: ContainerInchiriereDepozitareCuRelatii[] =
    await prisma.container_inchiriere_depozitare.findMany({
      where: { Utilizator: { id_utilizator: id } },
      include: {
        Utilizator: true,
        Container: true,
      },
    });

  return containereDepozitare;
}

export async function creazaContainerInchiriereDepozitare(
  utilizator: number,
  container: number,
  data_inceput: string,
  data_sfarsit: string,
  lat: number,
  long: number,
  tip: "FIX" | "MOBIL",
  pret: number
): Promise<void> {
  await prisma.$transaction(async (prisma) => {
    const containerNou: Container_inchiriere_depozitare | null =
      await prisma.container_inchiriere_depozitare.create({
        data: {
          utilizator,
          container,
          data_inceput,
          data_sfarsit,
          lat,
          long,
          tip,
        },
      });

    if (!containerNou) {
      throw new ExpressError(
        "Containerul de depozitare nu a putut fi închiriat",
        500
      );
    }

    const contract: Contract_inchiriere | null = await addContractInchiriere(
      containerNou.id_container_depozitare,
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

export async function deleteContainerDepozitareModel(id: number) {
  await prisma.container_inchiriere_depozitare.deleteMany({
    where: { container: id },
  });
}
