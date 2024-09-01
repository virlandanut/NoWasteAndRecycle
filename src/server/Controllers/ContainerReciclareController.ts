import { Request, Response } from "express";
import {
  adaugaContainer,
  getContainereReciclare,
  getContainerReciclare,
  getIdContainer,
} from "../Models/ContainerModel.js";
import {
  ContainerNou,
  ContainerReciclareFrontEnd,
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
  Container_inchiriere_reciclare,
  Contract_reciclare,
} from "@prisma/client";
import { getInchirieriContainerReciclare } from "../Models/ContainerReciclareModel.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";
import { getContractInchiriereReciclare } from "../Models/ContractReciclareModel.js";
import fs from "fs";
import { ContainerPartial, generareRutaOptima } from "../Utils/GA/GA.js";
import { ExpressError } from "../Utils/ExpressError.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export async function getConReciclare(request: Request, response: Response) {
  const containereReciclare = await getContainereReciclare();
  response.send({
    containereReciclare,
  });
}

export async function getRutaOptima(request: Request, response: Response) {
  const { latitudine, longitudine } = request.body;

  const containereReciclare = await getContainereReciclare();

  const data = fs.readFileSync("src/server/Utils/GA/containere.json", "utf-8");
  const dateContainere = JSON.parse(data);
  let containereReciclareStocate: ContainerPartial[] =
    dateContainere.containere;

  let dateDiferite: boolean = false;

  if (
    !(
      containereReciclareStocate[0].latitudine === latitudine &&
      containereReciclareStocate[0].longitudine === longitudine
    )
  ) {
    dateDiferite = true;
  }

  if (containereReciclareStocate.length - 1 !== containereReciclare.length) {
    dateDiferite = true;
  }

  for (let i: number = 0; i < containereReciclare.length; i++) {
    const container = containereReciclare[i];
    const containerStocat = containereReciclareStocate[i + 1];

    if (
      !containerStocat ||
      containerStocat.denumire !== container.denumire ||
      containerStocat.latitudine !== container.latitudine ||
      containerStocat.longitudine !== container.longitudine
    ) {
      dateDiferite = true;
      break;
    }
  }
  if (dateDiferite) {
    containereReciclareStocate[0].latitudine = latitudine;
    containereReciclareStocate[0].longitudine = longitudine;

    containereReciclareStocate = [
      containereReciclareStocate[0],
      ...containereReciclare.map((container) => ({
        denumire: container.denumire,
        latitudine: container.latitudine,
        longitudine: container.longitudine,
      })),
    ];

    let coordonate: string = "";

    containereReciclareStocate.map((container, index) => {
      if (index === containereReciclareStocate.length - 1) {
        coordonate += `${container.longitudine},${container.latitudine}`;
      } else {
        coordonate += `${container.longitudine},${container.latitudine};`;
      }
    });

    const url: string = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordonate}?&annotations=distance,duration&access_token=${process.env.MAPBOX_SECRET}`;

    try {
      const raspuns = await fetch(url);
      if (!raspuns.ok) {
        const eroare = await raspuns.json();
        throw new ExpressError(
          "Au existat probleme la obținerea matricelor algoritmului genetic: " +
            eroare,
          500
        );
      }
      const matrice = await raspuns.json();

      fs.writeFileSync(
        "src/server/Utils/GA/raspunsApi.json",
        JSON.stringify(
          { distances: matrice.distances, durations: matrice.durations },
          null,
          2
        ),
        "utf-8"
      );

      fs.writeFileSync(
        "src/server/Utils/GA/containere.json",
        JSON.stringify({ containere: containereReciclareStocate }, null, 2),
        "utf-8"
      );
    } catch (eroare) {
      throw new ExpressError(
        "Au existat probleme la obținerea matricelor algoritmului genetic: " +
          eroare,
        500
      );
    }
  }

  let startTime = performance.now();
  const dateRutaOptima = generareRutaOptima(100, 75);
  let endTime = performance.now();

  console.log(dateRutaOptima);

  console.log((endTime - startTime) / 1000 + "secunde");

  return response.status(200).json(dateRutaOptima);
}

export async function adaugaContainerReciclare(
  request: Request,
  response: Response
) {
  const {
    denumire,
    capacitate,
    tip,
    strada,
    numar,
    localitate,
    descriere,
    poza,
    codPostal,
  }: ContainerReciclareFrontEnd = request.body.data;

  const utilizator = request.session.utilizator;
  if (!utilizator) {
    return response.status(409).json({ mesaj: "Neautorizat!" });
  }
  const coordonate: Coordonate = await getCoordonate(
    `${numar} ${strada} ${localitate} ${codPostal} România`
  );

  const raspunsCloudinary = await cloudinary.uploader.upload(poza, {
    upload_preset: "containerReciclare",
  });

  const idLocalitate = await getIdLocalitate(localitate);

  const container: ContainerNou = {
    denumire: denumire,
    capacitate: parseInt(capacitate),
    strada: strada,
    numar: numar,
    descriere: descriere,
    firma: utilizator.id_utilizator,
    localitate: idLocalitate,
    lat: coordonate.latitudine,
    long: coordonate.longitudine,
    poza: raspunsCloudinary.url,
  };

  await adaugaContainer(container, Tip.RECICLARE, tip);
  const id_container: number = await getIdContainer(container.denumire);

  await adaugaPreturi(id_container, request.body.data);

  return response.status(200).json({
    id_container: id_container,
    mesaj: "Container închiriere adaugat cu success!",
  });
}

export async function getContainerRec(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const container = await getContainerReciclare(id);
  if (container) {
    return response.send(container);
  }
  return response
    .status(404)
    .json({ mesaj: "Container-ul de depozitare nu a fost găsit!" });
}

export async function getInchirieri(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const containereReciclare: Container_inchiriere_reciclare[] =
    await getInchirieriContainerReciclare(id);

  const toateDateleInchiriere: Set<string> = new Set();

  containereReciclare.forEach((container) => {
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

export async function getContract(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const contract: Contract_reciclare = await getContractInchiriereReciclare(id);

  return response.status(200).json(contract);
}
