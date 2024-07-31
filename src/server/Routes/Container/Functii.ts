import e from "express";
import prisma from "../../Prisma/client.js";
import { calculareDistanta } from "../../Utils/Functii/Functii_containere.js";
import calculeazaPretTotal from "../Plata/Functii.js";

async function verificaConflicteInchirieri(
  model: any,
  idContainer: number,
  dataInceput: Date,
  dataSfarsit: Date
) {
  return await model.findMany({
    where: {
      container: idContainer,
      AND: [
        { data_inceput: { lte: dataSfarsit } },
        { data_sfarsit: { gte: dataInceput } },
      ],
    },
  });
}

export async function selectieContainereDisponibile(
  containere: any,
  data_inceput: string | undefined,
  data_sfarsit: string | undefined,
  tipContainer: "RECICLARE" | "DEPOZITARE" | "MATERIALE"
) {
  const dataInceput = data_inceput ? new Date(data_inceput) : null;
  const dataSfarsit = data_sfarsit ? new Date(data_sfarsit) : null;

  if (!dataInceput || !dataSfarsit) {
    return containere;
  }
  const model =
    tipContainer === "RECICLARE"
      ? prisma.container_inchiriere_reciclare
      : prisma.container_inchiriere_depozitare;

  const containereDisponibile = [];
  for (const container of containere) {
    const confilcteInchirieri = await verificaConflicteInchirieri(
      model,
      container.id_container,
      dataInceput,
      dataSfarsit
    );

    if (confilcteInchirieri.length === 0) {
      containereDisponibile.push(container);
    }
  }

  return containereDisponibile;
}

export async function selectieContainereBuget(
  containere: any,
  buget: string | undefined,
  data_inceput: string | undefined,
  data_sfarsit: string | undefined
) {
  const dataInceput = data_inceput ? new Date(data_inceput) : null;
  const dataSfarsit = data_sfarsit ? new Date(data_sfarsit) : null;
  const bugetUtilizator = buget ? parseInt(buget) : null;

  if (!dataInceput || !dataSfarsit || !bugetUtilizator) {
    return containere.map((container: any) => ({ container, pretFinal: 0 }));
  }

  return containere
    .map((container: any) => {
      const pret = calculeazaPretTotal({
        dataInceput: dataInceput,
        dataSfarsit: dataSfarsit,
        preturi: container.Istoric_pret,
      });
      return pret.pretFinal <= bugetUtilizator
        ? { container, pretFinal: pret.pretFinal }
        : null;
    })
    .filter(Boolean);
}

export function selecteazaCelMaiIeftinContainer(containere: any) {
  return containere.reduce((predecesor: any, curent: any) =>
    predecesor.pretFinal < curent.pretFinal ? predecesor : curent
  );
}

export function selecteazaCelMaiApropiatContainer(
  containere: any,
  latitudineUtilizator: number,
  longitudineUtilizator: number
) {
  return containere
    .map((container: any) => ({
      ...container,
      distanta: calculareDistanta(
        latitudineUtilizator,
        longitudineUtilizator,
        container.container.lat,
        container.container.long
      ),
    }))
    .reduce((predecesor: any, curent: any) =>
      predecesor.distanta < curent.distanta ? predecesor : curent
    );
}
