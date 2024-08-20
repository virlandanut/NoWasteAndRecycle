import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import {
  getLoc,
  getLocalitati,
} from "../../Controllers/LocalitateController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    getLocalitati(request, response)
  )
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) =>
    getLoc(request, response)
  )
);

export default router;
