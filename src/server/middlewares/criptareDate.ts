import { Request, Response, NextFunction } from "express";
import { criptareParola } from "../BD/Bcrypt/criptare.js";
import { catchAsync } from "../utils/CatchAsync.js";
import { ExpressError } from "../utils/ExpressError.js";

const criptareDate = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.data)
      next(
        new ExpressError("Parola nu a putut fi criptată de către server", 400)
      );
    const formData = request.body.data;

    const parolaCriptata = await criptareParola(formData.parola);
    formData.parola = parolaCriptata;
    next();
  }
);

export default criptareDate;
