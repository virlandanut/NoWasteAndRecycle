import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Utilizator } from "../Interfete.js";

export async function adaugaUtilizator(utilizator: Utilizator): Promise<void> {
  let conexiune;
  try {
    const {
      nume_utilizator,
      parola,
      data_inscriere,
      email,
      telefon,
      strada,
      numar,
      localitate,
    } = utilizator;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .input("parola", mssql.NVarChar, parola)
      .input("data_inscriere", mssql.Date, data_inscriere)
      .input("email", mssql.NVarChar, email)
      .input("telefon", mssql.NVarChar, telefon)
      .input("strada", mssql.NVarChar, strada)
      .input("numar", mssql.NVarChar, numar)
      .input("localitate", mssql.Int, localitate)
      .query(`INSERT INTO Utilizator(email, nume_utilizator, parola, data_inscriere, telefon, strada, numar, localitate)
      VALUES(@email, @nume_utilizator, @parola, @data_inscriere, @telefon, @strada, @numar, @localitate)`);
  } catch (eroare) {
    console.log(
      "A existat o eroare la adăugarea utilizatorului în baza de date: ",
      eroare
    );
  }
}
