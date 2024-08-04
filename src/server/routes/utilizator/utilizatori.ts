import express, { Router, Request, Response } from "express";
import prisma from "../../Prisma/client.js";
import rutaPersoana from "./Persoana/Persoana.js";
import rutaFirma from "./Firma/Firma.js";
import bcrypt from "bcrypt";
import { comparaParole } from "../../Utils/Validari.js";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import {
  esteAutentificat,
  validareSchimbareParola,
} from "./Middlewares/Middlewares.js";
import { Firma, Persoana_fizica, Utilizator } from "@prisma/client";
import { getInchirieriContainerReciclareDateComplete } from "../Container/Reciclare/CRUD/Read.js";
import { getContainereInchiriereInchirieriDateComplete } from "../Container/Inchiriere/CRUD/Read.js";
import { Inchirieri } from "./Interfete.js";
import { ContainerInchiriereDepozitareCuRelatii } from "../Container/Inchiriere/Interfete.js";
import { ContainerInchiriereReciclareCuRelatii } from "../Container/Reciclare/Interfete.js";
import cloudinary from "../../Servicii/serviciu-cloudinary.js";
import { ExpressError } from "../../Utils/ExpressError.js";
const router: Router = express.Router({ mergeParams: true });
router.use(express.json({ limit: "500b" }));
router.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

router.get(
  "/:id/tip",
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);

    const [persoana, firma] = await Promise.all([
      prisma.persoana_fizica.findUnique({ where: { id_utilizator: id } }),
      prisma.firma.findUnique({ where: { id_utilizator: id } }),
    ]);

    if (!persoana && !firma) {
      return response
        .status(404)
        .json({ mesaj: "Utilizatorul nu există în baza de date" });
    }

    if (persoana) {
      return response.status(200).json({ tip: "PERSOANA", persoana });
    } else {
      return response.status(200).json({ tip: "FIRMA", firma });
    }
  })
);

router.post(
  "/login",
  catchAsync(async (request: Request, response: Response) => {
    const { nume_utilizator, parola } = request.body;
    const utilizator = await prisma.utilizator.findUnique({
      where: { nume_utilizator },
      include: { Localitate: true },
    });
    if (!utilizator) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }
    const comparareParole = await comparaParole(parola, utilizator.parola);

    if (!comparareParole) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }

    request.session.utilizator = utilizator;
    response
      .status(200)
      .json({ success: true, message: "Autentificare reușită!" });
  })
);

router.get(
  "/logout",
  esteAutentificat,
  (request: Request, response: Response) => {
    request.session.destroy((eroare) => {
      if (eroare) {
        response.status(500).json({ eroare: "Eroare de server" });
      } else {
        response.status(200).json({ success: true, message: "Logged out" });
      }
    });
  }
);

router.post(
  "/update/parola",
  esteAutentificat,
  validareSchimbareParola,
  catchAsync(async (request: Request, response: Response) => {
    const { idUtilizator, parolaVeche, parolaNoua } = request.body;
    const utilizator = await prisma.utilizator.findUnique({
      where: { id_utilizator: idUtilizator },
      select: { parola: true },
    });
    if (!utilizator) {
      return response
        .status(404)
        .json({ mesaj: "Utilizatorul nu a fost găsit" });
    }
    const esteAceeasiParola = await comparaParole(
      parolaVeche,
      utilizator.parola
    );

    if (!esteAceeasiParola) {
      return response
        .status(401)
        .json({ mesaj: "Parola curentă este eronată!" });
    }
    const parolaCriptata = await bcrypt.hash(parolaNoua, 10);
    await prisma.utilizator.update({
      where: { id_utilizator: idUtilizator },
      data: {
        parola: parolaCriptata,
      },
    });
    return response.status(200).json({ parolaActualizata: "true" });
  })
);

router.get(
  "/curent",
  catchAsync(async (request: Request, response: Response) => {
    if (request.session.utilizator) {
      const utilizator: Utilizator = request.session.utilizator;
      return response.status(200).json(utilizator);
    } else {
      return response
        .status(404)
        .json({ mesaj: "Sesiunea a expirat, vă rugăm să vă autentificați!" });
    }
  })
);

router.post(
  "/upload",
  catchAsync(async (request: Request, response: Response) => {
    const utilizatorCurent: Utilizator | null = request.session.utilizator;
    if (!utilizatorCurent) {
      throw new ExpressError("Utilizatorul curent nu există", 500);
    }
    const pozaVeche: string | null = utilizatorCurent.poza;
    if (pozaVeche) {
      const publicId: string | undefined = pozaVeche
        .split("/")
        .pop()
        ?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    if (!request.body.data) {
      return response
        .status(500)
        .json({ mesaj: "Imaginea nu a fost selectată" });
    }
    const fileStr = request.body.data;
    const raspunsUpload = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "nowasteandrecycle",
    });

    request.session.utilizator = await prisma.utilizator.update({
      where: { id_utilizator: utilizatorCurent.id_utilizator },
      data: { poza: raspunsUpload.url },
    });

    return response
      .status(200)
      .json({ mesaj: "Poza de profil a fost actualizată cu succes" });
  })
);

router.get(
  "/:nume_utilizator/inchirieri",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const nume_utilizator: string = request.params.nume_utilizator;
    const utilizatorCurent: Utilizator | null = request.session.utilizator;
    if (!utilizatorCurent) {
      return response
        .status(500)
        .json({ mesaj: "Utilizatorul nu este autentificat" });
    }
    if (utilizatorCurent.nume_utilizator !== nume_utilizator) {
      return response
        .status(403)
        .json({ mesaj: "Nu aveți dreptul să vizionați această pagină!" });
    }

    let raspunsInchirieri: Inchirieri = {
      containereDepozitare: [],
      containereReciclare: [],
    };

    if (utilizatorCurent.rol === "FIRMA") {
      const firma: Firma | null = await prisma.firma.findUnique({
        where: { id_utilizator: utilizatorCurent.id_utilizator },
      });
      if (!firma) {
        return response
          .status(500)
          .json({ mesaj: "Firma nu există în baza de date!" });
      }
      const containereReciclare: ContainerInchiriereReciclareCuRelatii[] =
        await getInchirieriContainerReciclareDateComplete(firma.denumire_firma);
      const containereInchiriere: ContainerInchiriereDepozitareCuRelatii[] =
        await getContainereInchiriereInchirieriDateComplete(
          utilizatorCurent.id_utilizator
        );

      raspunsInchirieri.containereReciclare = containereReciclare;
      raspunsInchirieri.containereDepozitare = containereInchiriere;
    } else {
      const containereInchiriere: ContainerInchiriereDepozitareCuRelatii[] =
        await getContainereInchiriereInchirieriDateComplete(
          utilizatorCurent.id_utilizator
        );
      raspunsInchirieri.containereDepozitare = containereInchiriere;
    }

    return response.status(200).json(raspunsInchirieri);
  })
);

router.use("/persoana", rutaPersoana);
router.use("/firma", rutaFirma);

export default router;
