import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import {
  getContainerInchiriere,
  getContainereInchiriere,
} from "../../BD/SQL_Utilizatori/containere.js";

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

export default router;
