import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./routes/utilizator/utilizatori.js";
import rutaValidari from "./routes/validari/validari.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use("/api/utilizatori", rutaUtilizator);
app.use("/api/validare", rutaValidari);

app.use(
  (
    error: ErrorRequestHandler,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    next(error);
  }
);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
