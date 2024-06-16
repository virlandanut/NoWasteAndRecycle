import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function setDrepturiFirma(
  id_utilizator: number,
  drepturi: boolean
): Promise<void> {
  const aprobare = drepturi === true ? 1 : 0;
  try {
    await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("aprobare", mssql.Int, aprobare)
      .query(
        `UPDATE Firma SET status_aprobare=@aprobare WHERE id_utilizator=@id_utilizator`
      );
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la schimbarea drepturilor firme",
        500
      );
    }
  }
}
