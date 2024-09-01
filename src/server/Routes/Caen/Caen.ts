import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { CaenController } from "../../Controllers/CaenController.js";
const router: Router = express.Router({ mergeParams: true });
router.use(express.json());
const caenController = new CaenController();

router.get(
  "/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) =>
    caenController.getCoduri(request, response)
  )
);

export default router;
