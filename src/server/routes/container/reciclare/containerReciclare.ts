import express, { Router, Request, Response } from "express";
import { ExpressError } from "../../../utils/ExpressError.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post("/new", (request: Request, response: Response) => {
  if (!request.body) {
    throw new ExpressError("Date container reciclare invalide!", 400);
  }

  const firma = (request.session as any).user;
  console.log(firma);

  console.log(request.body);
});

export default router;
