import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { DateExistentePersoana, Persoana } from "../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function modificaPersoana(
  persoana: DateExistentePersoana,
  id_utilizator: number
): Promise<void> {
  let conexiune;
  let tranzactie;
  try {
    const {
      nume_utilizator,
      nume,
      prenume,
      telefon,
      email,
      strada,
      numar,
      localitate,
    } = persoana;
    conexiune = await pool.connect();
    tranzactie = new mssql.Transaction(conexiune);
    await tranzactie.begin();

    const id_localitate_rezultat = await new mssql.Request(tranzactie)
      .input("localitate", mssql.NVarChar, localitate)
      .query(
        "SELECT id_localitate FROM Localitate WHERE denumire_localitate=@localitate"
      );

    if (id_localitate_rezultat.recordset.length === 0) {
      throw new ExpressError("Localitatea specificată nu a fost găsită", 500);
    }
    const id_localitate = id_localitate_rezultat.recordset[0].id_localitate;

    await new mssql.Request(tranzactie)
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .input("telefon", mssql.NVarChar, telefon)
      .input("email", mssql.NVarChar, email)
      .input("strada", mssql.NVarChar, strada)
      .input("numar", mssql.NVarChar, numar)
      .input("id_localitate", mssql.Int, id_localitate).query(`

        UPDATE Utilizator
        SET nume_utilizator = @nume_utilizator, telefon = @telefon, email = @email,
            strada = @strada, numar = @numar, localitate = @id_localitate
        WHERE id_utilizator = @id_utilizator
        
        `);

    await new mssql.Request(tranzactie)
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("nume", mssql.NVarChar, nume)
      .input("prenume", mssql.NVarChar, prenume).query(`

        UPDATE Persoana_fizica
        SET nume = @nume, prenume = @prenume
        WHERE id_utilizator = @id_utilizator
        
        `);

    await tranzactie.commit();
  } catch (eroare) {
    if (tranzactie) {
      await tranzactie.rollback();
    }
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la medificarea persoanei",
        500
      );
    }
  }
}
