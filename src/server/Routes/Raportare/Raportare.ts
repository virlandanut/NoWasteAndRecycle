import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares_CatchAsync.js";
import {
  RaportUtilizator,
  Raportare,
  TichetRaportare,
  dateTichetFirma,
} from "./Interfete.js";
import { adaugaRaportProblema } from "./CRUD/Create/SQL.js";
import { validareRaportare } from "./Validari.js";
import { esteAutentificat } from "../../Middlewares/Middlewares_Autorizare.js";
import { getIdTichet, getTichet, getTicheteRaport } from "./CRUD/Read/SQL.js";
import { v4 as uuidv4 } from "uuid";
import {
  getDenumireFirma,
  getNumeRolPersoana,
  verificareTipUtilizator,
} from "../../DB/SQL_Utilizatori/SQL_Utilizatori.js";
import { NumeRolPersoana } from "../../DB/SQL_Utilizatori/Interfete.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    if (request.session.user && request.session.user.id_utilizator) {
      const id = request.session.user.id_utilizator;
      const tichete: TichetRaportare[] = await getTicheteRaport(id);
      if (tichete.length > 0) {
        return response.status(200).json({ tichete });
      } else {
        return response
          .status(404)
          .json({ mesaj: "Nu aveți niciun tichet activ" });
      }
    } else {
      return response
        .status(400)
        .json({ mesaj: "Utilizatorul nu există în sesiune!" });
    }
  })
);

router.post(
  "/new",
  esteAutentificat,
  validareRaportare,
  catchAsync(async (request: Request, response: Response) => {
    const raport: Raportare = request.body;
    const numar_tichet: string = uuidv4();
    await adaugaRaportProblema(raport, numar_tichet);
    const id_tichet_problema = await getIdTichet(numar_tichet);
    return response.status(200).json({
      mesaj: "Tichetul a fost trimis cu succes!",
      id: id_tichet_problema,
    });
  })
);

interface dateTichetPersoana {
  tichet: TichetRaportare;
  nume: string;
  rol: string;
}

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const { id } = request.params;
    const tichet: TichetRaportare = await getTichet(parseInt(id));
    if (request.session.user && request.session.user.id_utilizator) {
      if (tichet.utilizator === request.session.user.id_utilizator) {
        const tip = await verificareTipUtilizator(tichet.utilizator);
        if (tip !== 0) {
          const denumireFirma = await getDenumireFirma(tichet.utilizator);
          const date: dateTichetFirma = {
            tichet: tichet,
            denumireFirma: denumireFirma,
            rol: "Firmă",
          };
          return response.status(200).send(date);
        } else {
          const numeRolPersoana: NumeRolPersoana = await getNumeRolPersoana(
            tichet.utilizator
          );
          const date: dateTichetPersoana = {
            tichet: tichet,
            nume: numeRolPersoana.nume,
            rol: numeRolPersoana.rol,
          };
          return response.status(200).send(date);
        }
      }
    }
  })
);

export default router;
