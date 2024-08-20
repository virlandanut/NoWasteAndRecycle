import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { getTipuriContainer } from "./CRUD/Read.js";
import { getTipuriContainere } from "../../Controllers/TipuriContainerController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    getTipuriContainere(request, response)
  )
);

export default router;
