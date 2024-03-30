import mssql from "mssql";
import { pool } from "../configurare.js";
import { codCAEN } from "../../../../interfaces.js";

export async function getCoduriCaen(): Promise<
  mssql.IResult<codCAEN[]> | undefined
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT cod_caen FROM Cod_caen");
    return rezultat;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function getIdCaen(cod_caen: number): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("cod_caen", mssql.Int, cod_caen)
      .query("SELECT id_caen FROM Cod_caen WHERE cod_caen=@cod_caen");
    return rezultat.recordset[0].id_caen;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}
