import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Localitate } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function getDenumireLocalitati(): Promise<
  mssql.IResult<Localitate[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      "SELECT denumire_localitate FROM Localitate"
    );
    return rezultat;
  } catch (eroare: any) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea localitatilor din baza de date",
        500
      );
    }
  }
}

export async function getIdLocalitate(
  denumire_localitate: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("denumire_localitate", mssql.NVarChar, denumire_localitate)
      .query(
        "SELECT id_localitate FROM Localitate WHERE denumire_localitate=@denumire_localitate"
      );

    return rezultat.recordset[0].id_localitate;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea id-ului localității din baza de date",
        500
      );
    }
  }
}
