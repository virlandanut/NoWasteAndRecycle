import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import {
  ComentariuTichet,
  Raportare,
  TichetCuNume,
  dateTichet,
} from "./Interfete.js";
import { adaugaRaportProblema } from "./CRUD/Create.js";
import { validareRaportare } from "./Validari.js";
import { esteAdministrator } from "../Administrator/Middlewares/Middlewares.js";
import {
  getComentariiAdministrator,
  getComentariiProprietarFirma,
  getComentariiProprietarPersoana,
  getProprietarTichet,
  getTichet,
  getTicheteRaport,
  getToateTicheteleFirme,
  getToateTichetelePersoane,
} from "./CRUD/Read.js";
import { formatareData } from "../../Utils/Functii/Functii_dataTimp.js";
import { solutioneazaTichet } from "./CRUD/Update.js";
import { stergeTichet, stergereComentariiTichet } from "./CRUD/Delete.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";
import { Raport_problema } from "@prisma/client";
import { ExpressError } from "../../Utils/ExpressError.js";
import prisma from "../../Prisma/client.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    if (!request.session.utilizator) {
      return response
        .status(400)
        .json({ mesaj: "Utilizatorul nu există în sesiune!" });
    }

    const id = request.session.utilizator.id_utilizator;
    const tichete: Raport_problema[] = await getTicheteRaport(id);
    if (tichete.length > 0) {
      return response.status(200).json({ tichete });
    } else {
      return response
        .status(200)
        .json({ mesaj: "Nu aveți niciun tichet activ" });
    }
  })
);

router.post(
  "/",
  esteAutentificat,
  validareRaportare,
  catchAsync(async (request: Request, response: Response) => {
    console.log(request.body);
    const { idUtilizator, titlu, mesaj }: Raportare = request.body;
    const raport: Raport_problema = await adaugaRaportProblema(
      idUtilizator,
      titlu,
      mesaj
    );
    if (!raport) {
      throw new ExpressError(
        "Tichetul nu a putut fi adăugat în baza de date",
        500
      );
    }
    return response.status(200).json({
      mesaj: "Tichetul a fost trimis cu succes!",
      id: raport.id_raport_problema,
    });
  })
);

router.post(
  "/update",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const id_tichet = parseInt(request.body.id_tichet);
    await solutioneazaTichet(id_tichet);
    return response
      .status(200)
      .json({ mesaj: "Tichetul a fost soluționat cu succes!" });
  })
);

router.delete(
  "/delete",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const id_tichet = parseInt(request.body.id_tichet);
    await stergereComentariiTichet(id_tichet);
    await stergeTichet(id_tichet);
    return response
      .status(200)
      .json({ mesaj: "Tichetul a fost șters cu succes!" });
  })
);

router.get(
  "/rapoarte",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const tichetePersoane: TichetCuNume[] = await getToateTichetelePersoane();
    const ticheteFirme: TichetCuNume[] = await getToateTicheteleFirme();

    return response.status(200).json([...tichetePersoane, ...ticheteFirme]);
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);

    const tichet: Raport_problema = await getTichet(id);
    const utilizatorTichet = await prisma.utilizator.findUnique({
      where: { id_utilizator: tichet.utilizator },
      include: {
        Persoana_fizica: {
          select: { nume: true, prenume: true },
        },
        Firma: {
          select: { denumire_firma: true },
        },
      },
    });

    if (!request.session.utilizator || !utilizatorTichet) {
      throw new ExpressError(
        "Nu aveți dreptul să vizualizați această pagină",
        403
      );
    }

    if (
      tichet.utilizator === request.session.utilizator.id_utilizator ||
      request.session.utilizator.rol === "ADMINISTRATOR"
    ) {
      let nume: string;
      if (utilizatorTichet.rol === "FIRMA" && utilizatorTichet.Firma) {
        nume = utilizatorTichet.Firma.denumire_firma;
      } else if (utilizatorTichet.Persoana_fizica) {
        nume = `${utilizatorTichet.Persoana_fizica.nume} ${utilizatorTichet.Persoana_fizica.prenume}`;
      } else {
        nume = "Cont șters";
      }

      const date: dateTichet = {
        tichet: tichet,
        nume: nume,
        rol: utilizatorTichet.rol,
      };

      console.log(date);

      return response.status(200).send(date);
    } else {
      return response.status(403).json({
        mesaj: "Nu aveți dreptul să vizualizați această pagină!",
      });
    }
  })
);

router.get(
  "/:id/comentarii",
  esteAutentificat,
  async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);

    const comentariiAdministratorPromise = getComentariiAdministrator(id);
    const idProprietarPromise = getProprietarTichet(id);
    const [comentariiAdministrator, idProprietar] = await Promise.all([
      comentariiAdministratorPromise,
      idProprietarPromise,
    ]);

    if (!idProprietar) {
      return response
        .status(404)
        .json({ mesaj: "Proprietarul nu a fost găsit" });
    }

    const proprietar = await prisma.utilizator.findUnique({
      where: { id_utilizator: idProprietar },
    });

    if (!proprietar) {
      throw new ExpressError("Proprietarul nu a putut fi obținut", 500);
    }

    let comentariiProprietar: ComentariuTichet[] = [];

    if (proprietar.rol === "FIRMA") {
      comentariiProprietar = await getComentariiProprietarFirma(
        id,
        idProprietar
      );
    } else {
      comentariiProprietar = await getComentariiProprietarPersoana(
        id,
        idProprietar
      );
    }

    const toateComentariile = [
      ...comentariiAdministrator,
      ...comentariiProprietar,
    ];
    toateComentariile.sort(
      (a: ComentariuTichet, b: ComentariuTichet) =>
        a.data.getTime() - b.data.getTime()
    );

    const comentariiTichet = toateComentariile.map(
      (comentariu: ComentariuTichet) => ({
        ...comentariu,
        data: formatareData(comentariu.data.toISOString()),
      })
    );

    response.status(200).send(comentariiTichet);
  }
);

export default router;
