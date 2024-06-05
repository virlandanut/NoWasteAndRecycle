import express, { Request, Response, NextFunction } from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./Routes/Utilizator/Utilizatori.js";
import rutaValidari from "./Routes/Validari/Validari.js";
import rutaContainere from "./Routes/Container/containere.js";
import rutaLocalitati from "./Routes/Localitati/Localitati.js";
import rutaTipuriContainere from "./Routes/TipuriContainer/TipuriContainer.js";
import rutaRaport from "./Routes/Raportare/Raportare.js";
import rutaComentariu from "./Routes/Comentariu/Comentariu.js";
import dotenv from "dotenv";
import { ExpressError } from "./Utils/ExpressError.js";
import { catchAsync } from "./Middlewares/Middlewares_CatchAsync.js";
import { getCoduriCaen } from "./DB/SQL_CAEN/SQL_CAEN.js";
import session from "express-session";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use("/api/utilizatori", rutaUtilizator);
app.use("/api/validare", rutaValidari);
app.use("/api/containere", rutaContainere);
app.use("/api/localitati", rutaLocalitati);
app.use("/api/tipuri", rutaTipuriContainere);
app.use("/api/raport", rutaRaport);
app.use("/api/comentariu", rutaComentariu);

app.get(
  "/api/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) => {
    const coduriCaen = await getCoduriCaen();
    response.json(coduriCaen.recordset);
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
