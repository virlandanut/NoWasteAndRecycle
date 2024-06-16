import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function stergeContainer(id_container: number): Promise<void> {
  let conexiune;
  let tranzactie;
  try {
    conexiune = await pool.connect();
    tranzactie = new mssql.Transaction(conexiune);
    await tranzactie.begin();

    const countTip = await new mssql.Request(tranzactie)
      .input("id_container", mssql.Int, id_container)
      .query(
        `SELECT COUNT(id_tip_container) AS tipuri FROM Tip_container WHERE container=@id_container`
      );
    if (countTip.recordset[0].tipuri !== 0) {
      await new mssql.Request(tranzactie)
        .input("id_container", mssql.Int, id_container)
        .query(`DELETE FROM Tip_container WHERE container=@id_tip_container`);
    }
  } catch (eroare) {
    if (tranzactie) {
      await tranzactie.rollback();
    }
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la ștergerea containerului",
        500
      );
    }
  }
}
