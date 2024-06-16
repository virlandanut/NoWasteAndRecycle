import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function validareDenumireContainer(
  denumite_container: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("denumire_container", mssql.NVarChar, denumite_container)
      .query(
        `SELECT COUNT(*) FROM Container WHERE denumire=@denumire_container`
      );
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la validarea denumirii containerului",
        500
      );
    }
  }
}
