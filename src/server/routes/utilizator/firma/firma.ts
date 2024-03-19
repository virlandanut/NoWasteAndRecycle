import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../utils/CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";
import { Firma, Utilizator } from "../../../../../interfaces.js";
import {
  creareFirma,
  creareUtilizator,
} from "../../../../client/utils/Utilizatori.js";
import criptareDate from "../../../middlewares/criptareDate.js";
import {
  validareFirma,
  verificareIntegritatiFirma,
  verificareIntegritatiUtilizator,
} from "../../../middlewares/validareDate.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  criptareDate,
  validareFirma,
  verificareIntegritatiUtilizator,
  verificareIntegritatiFirma,
  catchAsync(async (request: Request, response: Response) => {
    if (!request.body.data)
      throw new ExpressError("Date utilizator invalide!", 400);

    const utilizator: Utilizator = creareUtilizator(request.body.data);
    const firma: Firma = creareFirma(request.body.data);

    console.log(utilizator);
    console.log(firma);

    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  })
);

export default router;
