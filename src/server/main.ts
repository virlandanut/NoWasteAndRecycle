import express from "express";
import ViteExpress from "vite-express";
import { getUtilizatori, getUtilizator } from "./BazaDeDate/conexiune.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get("/api/utilizatori/", async (_, response) => {
  const rezultat = await getUtilizatori();
  response.json(rezultat?.recordset);
});

app.get("/api/utilizatori/:id", async (request, response) => {
  const { id } = request.params;
  const rezultat = await getUtilizator(id);
  response.json(rezultat?.recordset);
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
