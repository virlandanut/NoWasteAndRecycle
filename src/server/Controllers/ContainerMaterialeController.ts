import { Request, Response } from "express";
import { ContainerMaterialeFrontEnd } from "../Routes/Container/MaterialeConstructii/Interfete.js";
import {
  ContainerNou,
  Coordonate,
  Tip,
} from "../Routes/Container/Interfete.js";
import {
  adaugaPreturi,
  getAllDatesInRange,
  getCoordonate,
} from "../Utils/Functii/Functii_containere.js";
import cloudinary from "../Servicii/serviciu-cloudinary.js";
import { getIdLocalitate } from "../Models/LocaliltateModel.js";
import {
  adaugaContainer,
  getContainerMaterialeConstructii,
  getIdContainer,
} from "../Models/ContainerModel.js";
import { Container_inchiriere_depozitare } from "@prisma/client";
import { getContainereInchiriereInchirieri } from "../Models/ContainerDepozitareModel.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export async function adaugaContainerMateriale(
  request: Request,
  response: Response
) {
  const {
    denumire,
    capacitate,
    strada,
    numar,
    descriere,
    localitate,
    poza,
    codPostal,
  }: ContainerMaterialeFrontEnd = request.body.data;
  const utilizator = request.session.utilizator;
  if (!utilizator) {
    return response.status(409).json({
      mesaj: "Neautorizat!",
    });
  }
  const coordonate: Coordonate = await getCoordonate(
    `${numar} ${strada} ${localitate} ${codPostal} România`
  );

  const raspunsCloudinary = await cloudinary.uploader.upload(poza, {
    upload_preset: "containerDepozitare",
  });

  const idLocalitate = await getIdLocalitate(localitate);

  const container: ContainerNou = {
    denumire: denumire,
    capacitate: parseInt(capacitate),
    strada: strada,
    numar: numar,
    descriere: descriere,
    poza: raspunsCloudinary.url,
    firma: utilizator.id_utilizator,
    localitate: idLocalitate,
    lat: coordonate.latitudine,
    long: coordonate.longitudine,
  };

  await adaugaContainer(container, Tip.MOBIL);
  const id_container: number = await getIdContainer(container.denumire);

  await adaugaPreturi(id_container, request.body.data);

  return response.status(200).json({
    id_container: id_container,
    mesaj: "Container materiale de construcții adăugat cu succes!",
  });
}

export async function getContainerMateriale(
  request: Request,
  response: Response
) {
  const id = parseInt(request.params.id);
  const container = await getContainerMaterialeConstructii(id);
  if (container) {
    return response.send(container);
  }
  return response.status(404).json({
    mesaj: "Container-ul de reciclare materiale construcții nu a fost găsit!",
  });
}

export async function getInchirieriContainerMateriale(
  request: Request,
  response: Response
) {
  const id = parseInt(request.params.id);
  const containereDepozitare: Container_inchiriere_depozitare[] =
    await getContainereInchiriereInchirieri(id);

  const toateDateleInchiriere: Set<string> = new Set();

  containereDepozitare.forEach((container) => {
    const containerDataInceput =
      container.data_inceput.toLocaleDateString("ro-RO");
    const containerDataSfarsit =
      container.data_sfarsit.toLocaleDateString("ro-RO");

    const dataInceput = dayjs.utc(containerDataInceput, "DD.MM.YYYY");
    const dataSfarsit = dayjs.utc(containerDataSfarsit, "DD.MM.YYYY");

    const rangeData = getAllDatesInRange(dataInceput, dataSfarsit);
    rangeData.forEach((data) => toateDateleInchiriere.add(data));
  });

  return response.json(Array.from(toateDateleInchiriere));
}
