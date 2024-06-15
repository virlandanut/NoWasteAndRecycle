import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Comentariu } from "../Interfete.js";

export async function adaugaComentariu(comentariu: Comentariu): Promise<void> {
  let conexiune;
  try {
    conexiune = await pool
      .request()
      .input("id_utilizator", mssql.Int, comentariu.id_utilizator)
      .input("id_raport_problema", mssql.Int, comentariu.id_raport_problema)
      .input("mesaj", mssql.NVarChar, comentariu.mesaj)
      .query(
        `INSERT INTO Comentariu(tichet_problema, utilizator, mesaj) VALUES(@id_raport_problema, @id_utilizator, @mesaj)`
      );
  } catch (eroare) {
    console.log(
      "Au existat probleme la adăugarea comentariului în baza de date: ",
      eroare
    );
  }
}
