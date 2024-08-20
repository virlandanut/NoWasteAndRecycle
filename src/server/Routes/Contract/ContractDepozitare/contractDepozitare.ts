import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { getContractDepozitare } from "../../../Controllers/ContractDepozitareController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) =>
    getContractDepozitare(request, response)
  )
);

export default router;
