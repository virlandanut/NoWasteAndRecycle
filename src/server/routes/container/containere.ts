import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../middlewares/Middlewares_CatchAsync.js";
import {
  getContainerInchiriere,
  getContainereInchiriere,
  getPreturiContainerInchiriere,
} from "../../BD/SQL_Containere/SQL_Containere.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const containere = await getContainereInchiriere();
    response.send(containere.recordset);
  })
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
    const { id } = request.params;
    const container = await getContainerInchiriere(parseInt(id));
    response.send(container);
  })
);

router.get(
  "/:id/preturi",
  catchAsync(async (request: Request, response: Response) => {
    const { id } = request.params;
    const preturi = await getPreturiContainerInchiriere(parseInt(id));
    response.json(preturi);
  })
);

export default router;
