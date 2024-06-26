import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { codCAEN } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function getCoduriCaen(): Promise<mssql.IResult<codCAEN[]>> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT cod_caen FROM Cod_caen");
    return rezultat;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea codurilor CAEN din baza de date",
        500
      );
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
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea id-ului codului CAEN din baza de date",
        500
      );
    }
  }
}
