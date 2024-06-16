import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function adaugaTipContainer(
  id_container: number,
  id_tip_deseu: number
): Promise<void> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    await cerere
      .input("id_container", mssql.Int, id_container)
      .input("id_tip_deseu", mssql.Int, id_tip_deseu)
      .query(
        "INSERT INTO Tip_container(container, tip_deseu) VALUES(@id_container, @id_tip_deseu)"
      );
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la adăugarea tipului de container",
        500
      );
    }
  }
}
