import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../middlewares/Middlewares_CatchAsync.js";
import { getDenumireLocalitati } from "../../BD/SQL_Localitati/SQL_Localitati.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const localitati = await getDenumireLocalitati();
    response.json(localitati.recordset);
  })
);

export default router;