import express, { Request, Response, Router } from "express";
import moment from "moment";
import {
  crearePersoana,
  creareUtilizator,
} from "../../../Utils/Functii/Functii_utilizatori.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import {
  validarePersoana,
  validareSDPersoana,
  verificareIntegritatiPersoana,
} from "./Middlewares.js";
import { Utilizator } from "../Interfete.js";
import { DateExistentePersoana, Persoana } from "./Interfete.js";
import { adaugaPersoana } from "./CRUD/Create.js";
import { getDateExistentePersoana } from "./CRUD/Read.js";
import {
  criptareParola,
  esteAutentificat,
  verificareIntegritatiSDUtilizator,
  verificareIntegritatiUtilizator,
} from "../Middlewares/Middlewares.js";
import { getIdUtilizator } from "../CRUD/Read.js";
import { modificaPersoana } from "./CRUD/Update.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { adaugaUtilizator } from "../CRUD/Create.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  criptareParola,
  validarePersoana,
  verificareIntegritatiUtilizator,
  verificareIntegritatiPersoana,
  catchAsync(async (request: Request, response: Response) => {
    if (!request.body.data)
      throw new ExpressError("Date utilizator invalide!", 500);

    const utilizator: Utilizator = creareUtilizator(request.body.data);
    utilizator.data_inscriere = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const id_localitate: number = await getIdLocalitate(
      request.body.data.localitate
    );
    utilizator.localitate = id_localitate;

    const persoana: Persoana = crearePersoana(request.body.data);

    console.log(utilizator);
    console.log(persoana);
    console.log(id_localitate);

    await adaugaUtilizator(utilizator);

    const id: number = await getIdUtilizator(utilizator.nume_utilizator);
    persoana.id_utilizator = id;

    await adaugaPersoana(persoana);

    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  })
);

router.get(
  "/date",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    if (request.session.user && request.session.user.id_utilizator) {
      const dateCurentePersoana = await getDateExistentePersoana(
        request.session.user.id_utilizator
      );
      return response.status(200).json({ dateCurentePersoana });
    } else {
      return response.status(500).json({
        mesaj: "Datele curente ale persoanei nu au putut fi obținute",
      });
    }
  })
);

router.put(
  "/edit",
  esteAutentificat,
  validareSDPersoana,
  verificareIntegritatiSDUtilizator,
  catchAsync(async (request: Request, response: Response) => {
    const date: DateExistentePersoana = request.body.data;
    if (request.session.user && request.session.user.id_utilizator) {
      await modificaPersoana(date, request.session.user.id_utilizator);

      return response
        .status(200)
        .json({ mesaj: "Datele contului au fost actualizate cu succes!" });
    } else {
      return response
        .status(500)
        .json({ mesaj: "Datele contului nu au putut fi actualizate" });
    }
  })
);

export default router;
