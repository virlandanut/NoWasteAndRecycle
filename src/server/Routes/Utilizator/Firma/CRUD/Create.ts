import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { Firma } from "../Interfete.js";

export async function adaugaFirma(firma: Firma): Promise<void> {
  let conexiune;
  try {
    const { id_utilizator, denumire_firma, cif, caen } = firma;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("denumire_firma", mssql.NVarChar, denumire_firma)
      .input("cif", mssql.NVarChar, cif)
      .input("caen", mssql.Int, caen)
      .query(
        "INSERT INTO Firma(id_utilizator, denumire_firma, cif, caen) VALUES(@id_utilizator, @denumire_firma, @cif, @caen)"
      );
  } catch (eroare) {
    console.log(
      "A existat o eroare la adăugarea persoanei în baza de date: ",
      eroare
    );
  }
}
