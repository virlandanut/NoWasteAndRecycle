import prisma from "../Prisma/client.js";
import { Request, Response } from "express";
import {
  creareFirma,
  creareUtilizator,
} from "../Utils/Functii/Functii_utilizatori.js";
import { Firma, Localitate, Utilizator } from "@prisma/client";
import {
  DateExistenteFirma,
  MetriciFirma,
} from "../Routes/Utilizator/Firma/Interfete.js";
import { Inchirieri } from "../Routes/Utilizator/Interfete.js";
import { ContainerInchiriereReciclareCuRelatii } from "../Routes/Container/Reciclare/Interfete.js";
import { ContainerInchiriereDepozitareCuRelatii } from "../Routes/Container/Inchiriere/Interfete.js";
import {
  addFirma,
  getFirmaCuId,
  getToateFirmele,
  setDrepturiFirma,
  updateFirma,
} from "../Models/FirmaModel.js";
import { getLocalitateCuDenumire } from "../Models/LocaliltateModel.js";
import { getIdCaen } from "../Models/CaenModel.js";
import {
  addUtilizator,
  getDateCompletePJ,
  getUtilizatorCuId,
  updateUtilizator,
} from "../Models/UtilizatorModel.js";
import { getInchirieriContainerReciclareCompleteFirma } from "../Models/ContainerReciclareModel.js";
import { getContainereInchiriereInchirieriDateCompleteFirma } from "../Models/ContainerDepozitareModel.js";

export async function getFirma(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const firma: Firma | null = await getFirmaCuId(id);
  if (firma) {
    return response.status(200).json(firma);
  } else {
    return response.status(404).json({ mesaj: "Această firmă nu există!" });
  }
}

export async function adaugaFirma(request: Request, response: Response) {
  const utilizator = creareUtilizator(request.body);
  const firma = creareFirma(request.body);

  const localitate = await getLocalitateCuDenumire(utilizator.localitate);

  if (!localitate) {
    return response
      .status(404)
      .json({ eroare: "Localitatea nu a putut fi găsită!" });
  }

  const caen = await getIdCaen(firma.caen);

  if (!caen) {
    return response
      .status(404)
      .json({ eroare: "Codul CAEN mu a putut fi găsit!" });
  }

  const utilizatorNou: Utilizator = await addUtilizator(
    utilizator,
    "FIRMA",
    localitate.id_localitate
  );

  const firmaNoua: Firma = await addFirma(
    utilizatorNou.id_utilizator,
    firma,
    caen
  );

  if (firmaNoua) {
    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  } else {
    response
      .status(500)
      .json({ success: false, message: "Contul nu a fost creat!" });
  }
}

export async function schimbaDrepturiFirma(
  request: Request,
  response: Response
) {
  const { id_utilizator, bifat } = request.body;
  await setDrepturiFirma(id_utilizator, bifat);
  response
    .status(200)
    .json({ mesaj: "Drepturile firmei au fost actualizate!" });
}

export async function modificaFirma(request: Request, response: Response) {
  const date: DateExistenteFirma = request.body.data;
  if (!request.session.utilizator) {
    return response
      .status(500)
      .json({ mesaj: "Datele contului nu au putut fi actualizate" });
  }

  const utilizator: Utilizator | null = await getUtilizatorCuId(
    request.session.utilizator.id_utilizator
  );

  if (!utilizator) {
    return response
      .status(404)
      .json({ mesaj: "Utilizatorul nu există în baza de date" });
  }

  const localitate: Localitate | null = await getLocalitateCuDenumire(
    date.localitate
  );

  if (!localitate) {
    return response
      .status(404)
      .json({ mesaj: "Localitatea nu există în baza de date" });
  }

  await prisma.$transaction(async () => {
    const utilizatorActualizat = await updateUtilizator(
      utilizator.id_utilizator,
      {
        email: date.email,
        nume_utilizator: date.nume_utilizator,
        telefon: date.telefon,
        strada: date.strada,
        numar: date.numar,
      },
      localitate.id_localitate
    );

    request.session.utilizator = utilizatorActualizat;

    await updateFirma(utilizator.id_utilizator, date.denumire_firma);
  });
  return response
    .status(200)
    .json({ mesaj: "Datele contului au fost actualizate cu succes!" });
}

export async function getDateCompleteFirma(
  request: Request,
  response: Response
) {
  const id: number = parseInt(request.params.id);
  if (
    !id ||
    !request.session.utilizator ||
    request.session.utilizator.id_utilizator !== id
  ) {
    return response.status(500).json({
      mesaj: "Datele curente ale firmei nu au putut fi obținute",
    });
  }
  const firma = await getDateCompletePJ(id);
  if (firma) {
    return response.status(200).json(firma);
  } else {
    return response.status(500).json({
      mesaj: "Datele complete ale firmei nu au putut fi obținute",
    });
  }
}

export async function getInchirieriFirma(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const utilizatorCurent = request.session.utilizator;
  if (!utilizatorCurent) {
    return response
      .status(500)
      .json({ mesaj: "Utilizatorul nu este autentificat" });
  }
  if (utilizatorCurent.id_utilizator !== id) {
    return response
      .status(403)
      .json({ mesaj: "Nu aveți dreptul să vizionați această pagină!" });
  }
  let raspunsInchirieri: Inchirieri = {
    containereDepozitare: [],
    containereReciclare: [],
  };

  const firma: Firma | null = await getFirmaCuId(
    utilizatorCurent.id_utilizator
  );

  if (!firma) {
    return response
      .status(500)
      .json({ mesaj: "Firma nu există în baza de date!" });
  }

  const containereReciclare: ContainerInchiriereReciclareCuRelatii[] =
    await getInchirieriContainerReciclareCompleteFirma(id);
  const containereInchiriere: ContainerInchiriereDepozitareCuRelatii[] =
    await getContainereInchiriereInchirieriDateCompleteFirma(id);

  raspunsInchirieri.containereReciclare = containereReciclare;
  raspunsInchirieri.containereDepozitare = containereInchiriere;

  console.log(raspunsInchirieri);

  return response.status(200).json(raspunsInchirieri);
}

export async function getFirme(request: Request, response: Response) {
  const firme: MetriciFirma[] = await getToateFirmele();

  return response.status(200).json(firme);
}
