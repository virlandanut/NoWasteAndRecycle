import mssql from "mssql";
import { pool } from "../../../../DB/configurare.js";
import { Raportare } from "../../Interfete.js";

export async function adaugaRaportProblema(raport: Raportare): Promise<void> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    await pool
      .request()
      .input("idUtilizator", mssql.Int, raport.idUtilizator)
      .input("titlu", mssql.NVarChar, raport.titlu)
      .input("mesaj", mssql.NVarChar, raport.mesaj)
      .query(
        `INSERT INTO Raport_problema(utilizator, titlu, mesaj) VALUES(@idUtilizator, titlu, mesaj)`
      );
  } catch (eroare) {
    console.log(
      "Au existat probleme la adăugarea raportului în baza de date: ",
      eroare
    );
  }
}
