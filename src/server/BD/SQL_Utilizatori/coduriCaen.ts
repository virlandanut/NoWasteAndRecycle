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
    const rezultat = await cerere.query("SELECT codCaen FROM CodCaen");
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
