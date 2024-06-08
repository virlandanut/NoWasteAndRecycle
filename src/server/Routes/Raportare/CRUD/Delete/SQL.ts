import mssql, { ConnectionPool } from "mssql";
import { pool } from "../../../../DB/configurare.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function stergereComentariiTichet(
  id_raport_problema: number
): Promise<void> {
  let conexiune: ConnectionPool | undefined;
  try {
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .query(
        "DELETE FROM Comentariu WHERE tichet_problema=@id_raport_problema"
      );
  } catch (eroare) {
    if (eroare instanceof Error) {
      throw new ExpressError(eroare.message, 500);
    } else {
      console.log(eroare);
    }
  } finally {
    if (conexiune) {
      try {
        await conexiune.close();
      } catch (eroare) {
        throw new ExpressError(
          "Au existat probleme la închiderea conexiunii (Raportare/CRUT/Delete/SQL/stergereComentariiTichet)",
          500
        );
      }
    }
  }
}

export async function stergeTichet(id_raport_problema: number): Promise<void> {
  let conexiune: ConnectionPool | undefined;
  try {
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .query(
        "DELETE FROM Raport_problema WHERE id_raport_problema=@id_raport_problema"
      );
  } catch (eroare) {
    throw new ExpressError(
      "Tichetul nu a putut fi șters din baza de date",
      500
    );
  } finally {
    if (conexiune) {
      try {
        await conexiune.close();
      } catch (eroare) {
        throw new ExpressError(
          "Au existat probleme la închiderea conexiunii (Raportare/CRUT/Delete/SQL/stergeTichet)",
          500
        );
      }
    }
  }
}
