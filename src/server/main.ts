import express from "express";
import ViteExpress from "vite-express";
import rutaUtilizator from "./routes/utilizatori.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use("/api/utilizatori", rutaUtilizator);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
