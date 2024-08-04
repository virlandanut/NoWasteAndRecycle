import { Utilizator } from "@prisma/client";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../Utils/ExpressError.js";
import { getProprietarRecenzie } from "./CRUD/Read.js";

class MiddleWare {
  esteProprietarRecenzie = catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const id: number = parseInt(request.params.id);
        const utilizatorCurent: Utilizator | null = request.session.utilizator;
        if (!utilizatorCurent) {
          throw new ExpressError("Utilizatorul nu există în sesiune", 500);
        }
        if (utilizatorCurent.rol === "ADMINISTRATOR") {
          next();
        }
        const proprietarRecenzie: Utilizator = await getProprietarRecenzie(id);
        if (
          utilizatorCurent.id_utilizator !== proprietarRecenzie.id_utilizator
        ) {
          throw new ExpressError("Acțiunea nu este permisă", 403);
        }
        next();
      } catch (eroare) {
        next(eroare);
      }
    }
  );
}

export default new MiddleWare();
