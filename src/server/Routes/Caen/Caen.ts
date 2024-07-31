import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { getCoduriCaen } from "./CRUD/Read.js";
import * as fs from "fs";
import prisma from "../../Prisma/client.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) => {
    const coduriCaen = await getCoduriCaen();
    response.json(coduriCaen);
  })
);

export default router;
