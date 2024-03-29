import express, { Request, Response, NextFunction } from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./routes/utilizator/utilizatori.js";
import rutaValidari from "./routes/validari/validari.js";
import rutaContainere from "./routes/container/containere.js";
import dotenv from "dotenv";
import { ExpressError } from "./utils/ExpressError.js";
import { catchAsync } from "./utils/CatchAsync.js";
import { getCoduriCaen } from "./BD/SQL_Utilizatori/coduriCaen.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use("/api/utilizatori", rutaUtilizator);
app.use("/api/validare", rutaValidari);
app.use("/api/containere", rutaContainere);

app.get(
  "/api/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) => {
    const coduriCaen = await getCoduriCaen();
    response.json(coduriCaen?.recordset);
  })
);

app.all(
  "/api/*",
  (request: Request, response: Response, next: NextFunction) => {
    next(new ExpressError("Ruta pe care doriți să o accesați nu există!", 404));
  }
);

app.use(
  (
    error: ExpressError,
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const { statusCode = 500, message = "Eroare generică" } = error;
    response.status(statusCode).send(message);
    console.log(statusCode, message);
  }
);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
