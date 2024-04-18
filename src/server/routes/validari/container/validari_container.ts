import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../middlewares/Middlewares_CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";
import { validareDenumireContainer } from "../../../BD/SQL_Containere/SQL_Containere.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/denumire",
  catchAsync(async (request: Request, response: Response) => {
    const { denumire } = request.query;
    if (typeof denumire !== "string") {
      throw new ExpressError("Denumirea este invalidă!", 400);
    }
    const countDenumire: number = await validareDenumireContainer(denumire);
    if (countDenumire > 0) {
      response.status(409).json({ mesaj: "Acest container există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

export default router;