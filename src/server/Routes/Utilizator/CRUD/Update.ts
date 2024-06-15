import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";

export async function schimbaParolaUtilizator(
  id_utilizator: number,
  parola: string
): Promise<void> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("parola", mssql.NVarChar, parola)
      .query(
        "UPDATE Utilizator SET parola=@parola WHERE id_utilizator=@id_utilizator"
      );
  } catch (eroare) {
    console.log(
      "A existat o eroare la actualizarea parolei utilizatorului:",
      eroare
    );
  }
}
