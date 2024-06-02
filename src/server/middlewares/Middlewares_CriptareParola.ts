import { Request, Response, NextFunction } from "express";
import { catchAsync } from "./Middlewares_CatchAsync.js";
import { ExpressError } from "../Utils/ExpressError.js";
import bcrypt from "bcrypt";

const criptareParola = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.data)
      next(
        new ExpressError("Parola nu a putut fi criptată de către server", 400)
      );
    const formData = request.body.data;

    const parolaCriptata = await bcrypt.hash(formData.parola, 10);
    formData.parola = parolaCriptata;
    next();
  }
);

export default criptareParola;
