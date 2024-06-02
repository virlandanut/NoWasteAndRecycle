import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares_CatchAsync.js";
import { getTipuriContainer } from "../../DB/SQL_TipuriContainer/SQL_TipuriContainer.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const tipuriContainer = await getTipuriContainer();
    response.json(tipuriContainer);
  })
);

export default router;
