import express, { Request, Response, NextFunction } from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./Routes/Utilizator/Utilizatori.js";
import rutaValidari from "./Routes/Validari/Validari.js";
import rutaContainere from "./Routes/Container/Containere.js";
import rutaLocalitati from "./Routes/Localitati/Localitati.js";
import rutaTipuriContainere from "./Routes/TipuriContainer/TipuriContainer.js";
import rutaRaport from "./Routes/Raportare/Raportare.js";
import rutaComentariu from "./Routes/Comentariu/Comentariu.js";
import rutaAdmin from "./Routes/Administrator/Administrator.js";
import rutaCaen from "./Routes/Caen/Caen.js";
import rutaPlata from "./Routes/Plata/Plata.js";
import rutaContractReciclare from "./Routes/Contract/ContractReciclare/contractReciclare.js";
import rutaContractDepozitare from "./Routes/Contract/ContractDepozitare/contractDepozitare.js";
import rutaRecenzie from "./Routes/Recenzie/Recenzie.js";
import rutaChatBot from "./Routes/Chatbot/Chatbot.js";
import dotenv from "dotenv";
import { ExpressError } from "./Utils/ExpressError.js";

import session from "express-session";

dotenv.config();
const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/plata", rutaPlata);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use("/api/utilizatori", rutaUtilizator);
app.use("/api/validare", rutaValidari);
app.use("/api/containere", rutaContainere);
app.use("/api/localitati", rutaLocalitati);
app.use("/api/tipuri", rutaTipuriContainere);
app.use("/api/raport", rutaRaport);
app.use("/api/comentariu", rutaComentariu);
app.use("/api/admin", rutaAdmin);
app.use("/api/caen", rutaCaen);
app.use("/api/contractReciclare", rutaContractReciclare);
app.use("/api/contractDepozitare", rutaContractDepozitare);
app.use("/api/recenzie", rutaRecenzie);
app.use("/api/chatbot", rutaChatBot);

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
    console.log(statusCode, message);
  }
);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
