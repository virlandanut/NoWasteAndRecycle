import express, { Request, Response, NextFunction, response } from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./routes/utilizator/utilizatori.js";
import rutaValidari from "./routes/validari/validari.js";
import dotenv from "dotenv";
import { ExpressError } from "./utils/ExpressError.js";
import { Utilizator } from "../../interfaces.js";
import { getAuthUtilizator } from "./BD/SQL_Utilizatori/utilizatori.js";
import { comparaParole, criptareParola } from "./BD/Bcrypt/criptare.js";
import { catchAsync } from "./utils/CatchAsync.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.post(
  "/api/login",
  catchAsync(async (request: Request, response: Response) => {
    const { username, parola } = request.body;
    const utilizator: Utilizator = await getAuthUtilizator(username);
    if (!utilizator) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }
    const comparareParole = await comparaParole(
      parola.trim().toLowerCase(),
      utilizator.parola
    );

    if (!comparareParole) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }

    response.status(200).json({ success: true, message: "Login successful" });
  })
);

app.use("/api/utilizatori", rutaUtilizator);
app.use("/api/validare", rutaValidari);

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
