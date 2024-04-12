import express, { Router, Request, Response } from "express";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post("/new", (request: Request, response: Response) => {
  console.log(request.body);
});
