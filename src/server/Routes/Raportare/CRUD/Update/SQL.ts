import mssql, { ConnectionPool } from "mssql";
import { pool } from "../../../../DB/configurare.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function solutioneazaTichet(
  id_raport_problema: number
): Promise<void> {
  let conexiune: ConnectionPool | undefined;
  try {
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .query(
        "UPDATE Raport_problema SET status = 1 WHERE id_raport_problema=@id_raport_problema"
      );
  } catch (eroare) {
    throw new ExpressError("Tichetul nu a putut fi marcat ca rezolvat", 500);
  } finally {
    if (conexiune) {
      try {
        await conexiune.close();
      } catch (eroare) {
        throw new ExpressError(
          "Au existat probleme la închiderea conexiunii (Raportare/CRUT/Update/SQL/solutioneazaTichet)",
          500
        );
      }
    }
  }
}
