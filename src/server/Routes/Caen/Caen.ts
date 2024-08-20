import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { getCoduri } from "../../Controllers/CaenController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) =>
    getCoduri(request, response)
  )
);

export default router;
