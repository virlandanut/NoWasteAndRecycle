import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import moment from "moment";
import {
  creareFirma,
  creareUtilizator,
} from "../../../Utils/Functii/Functii_utilizatori.js";
import {
  criptareParola,
  esteAutentificat,
  verificareIntegritatiSDUtilizator,
  verificareIntegritatiUtilizator,
} from "../Middlewares/Middlewares.js";

import { Utilizator } from "../Interfete.js";
import { DateExistenteFirma, Firma } from "./Interfete.js";
import {
  validareFirma,
  validareSDFirma,
  verificareIntegritatiFirma,
} from "./Middlewares/Middlewares.js";
import { adaugaUtilizator } from "../CRUD/Create.js";
import { getIdUtilizator } from "../CRUD/Read.js";
import { adaugaFirma } from "./CRUD/Create.js";
import { modificaFirma, setDrepturiFirma } from "./CRUD/Update.js";
import { getCoduriCaen, getIdCaen } from "../../Caen/CRUD/Read.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { esteAdministrator } from "../../Administrator/Middlewares/Middlewares.js";
import { getDateExistenteFirma } from "./CRUD/Read.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  criptareParola,
  validareFirma,
  verificareIntegritatiUtilizator,
  verificareIntegritatiFirma,
  catchAsync(async (request: Request, response: Response) => {
    if (!request.body.data)
      throw new ExpressError("Date utilizator invalide!", 400);

    console.log(request.body);

    const utilizator: Utilizator = creareUtilizator(request.body.data);
    utilizator.data_inscriere = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const firma: Firma = creareFirma(request.body.data);

    const id_localitate: number = await getIdLocalitate(
      request.body.data.localitate
    );
    utilizator.localitate = id_localitate;
    await adaugaUtilizator(utilizator);

    const id: number = await getIdUtilizator(utilizator.nume_utilizator);
    firma.id_utilizator = id;
    const id_caen: number = await getIdCaen(firma.caen);
    firma.caen = id_caen;

    await adaugaFirma(firma);

    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  })
);

interface SchimbaDrepturiObj {
  id_utilizator: number;
  bifat: boolean;
}

router.post(
  "/schimbaDrepturi",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const { id_utilizator, bifat }: SchimbaDrepturiObj = request.body;
    await setDrepturiFirma(id_utilizator, bifat);
    response
      .status(200)
      .json({ mesaj: "Drepturile firmei au fost actualizate!" });
  })
);

router.get(
  "/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) => {
    const coduriCaen = await getCoduriCaen();
    response.json(coduriCaen.recordset);
  })
);

router.get(
  "/date",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    if (request.session.user && request.session.user.id_utilizator) {
      const dateCurenteFirma = await getDateExistenteFirma(
        request.session.user.id_utilizator
      );
      return response.status(200).json({ dateCurenteFirma });
    } else {
      return response.status(500).json({
        mesaj: "Datele curente ale firmei nu au putut fi obținute",
      });
    }
  })
);

router.put(
  "/edit",
  esteAutentificat,
  validareSDFirma,
  verificareIntegritatiSDUtilizator,
  catchAsync(async (request: Request, response: Response) => {
    const date: DateExistenteFirma = request.body.data;
    if (request.session.user && request.session.user.id_utilizator) {
      await modificaFirma(date, request.session.user.id_utilizator);

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
