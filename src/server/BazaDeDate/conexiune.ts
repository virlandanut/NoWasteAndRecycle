import mssql from "mssql";
import { pool } from "./configurare.js";
import { Utilizator } from "../interfaces.js";

async function executaQuery(query: string): Promise<mssql.IResult<any>> {
  try {
    await pool.connect();
    const cerere = new mssql.Request(pool);
    const rezultat = await cerere.query(query);

    return rezultat;
  } catch (eroare) {
    console.log(eroare);
    throw eroare;
  } finally {
    pool.close();
  }
}

export async function getUtilizatori(): Promise<
  mssql.IResult<Utilizator[]> | undefined
> {
  try {
    const query = "SELECT * FROM Utilizator";
    const rezultat = await executaQuery(query);
    return rezultat;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
  }
}

export async function getUtilizator(
  idUtilizator: string
): Promise<mssql.IResult<Utilizator | undefined>> {
  try {
    await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("idUtilizator", mssql.Int, idUtilizator)
      .query("SELECT * FROM Utilizator WHERE idUtilizator = @idUtilizator");

    return rezultat;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  } finally {
    await pool.close();
  }
}
