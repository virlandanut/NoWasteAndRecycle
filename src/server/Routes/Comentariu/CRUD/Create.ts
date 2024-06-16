import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Comentariu } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function adaugaComentariu(comentariu: Comentariu): Promise<void> {
  try {
    await pool
      .request()
      .input("id_utilizator", mssql.Int, comentariu.id_utilizator)
      .input("id_raport_problema", mssql.Int, comentariu.id_raport_problema)
      .input("mesaj", mssql.NVarChar, comentariu.mesaj)
      .query(
        `INSERT INTO Comentariu(tichet_problema, utilizator, mesaj) VALUES(@id_raport_problema, @id_utilizator, @mesaj)`
      );
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la adăugarea comentariului în baza de date",
        500
      );
    }
  }
}
