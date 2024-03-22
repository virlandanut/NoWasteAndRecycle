import express, { Request, Response, NextFunction } from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./routes/utilizator/utilizatori.js";
import rutaValidari from "./routes/validari/validari.js";
import dotenv from "dotenv";
import session from "express-session";
import { ExpressError } from "./utils/ExpressError.js";
import { Utilizator } from "../../interfaces.js";
import { getAuthUtilizator } from "./BD/SQL_Utilizatori/utilizatori.js";
import { comparaParole } from "./BD/Bcrypt/criptare.js";
import { catchAsync } from "./utils/CatchAsync.js";
import { getCoduriCaen } from "./BD/SQL_Utilizatori/coduriCaen.js";
import { esteLogat } from "./middlewares/validareDate.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

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
    (request.session as any).user = utilizator;
    response.status(200).json({ success: true, message: "Login successful" });
  })
);

app.get("/api/logout", esteLogat, (request: Request, response: Response) => {
  request.session.destroy((eroare) => {
    if (eroare) {
      response.status(500).json({ eroare: "Eroare de server" });
    } else {
      response.status(200).json({ success: true, message: "Logged out" });
    }
  });
});

app.get("/api/esteLogat", esteLogat, (request: Request, response: Response) => {
  response
    .status(200)
    .json({ success: true, message: "Utilizatorul este logat" });
});

app.use("/api/utilizatori", rutaUtilizator);
app.use("/api/validare", rutaValidari);

app.get(
  "/api/getCoduriCaen",
  esteLogat,
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
