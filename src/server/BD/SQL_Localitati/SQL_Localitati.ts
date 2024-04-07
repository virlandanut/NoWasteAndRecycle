import mssql from "mssql";
import { pool } from "../configurare.js";
import { Localitate } from "../../../interfaces/Interfete_Localitate.js";

export async function getDenumireLocalitati(): Promise<
  mssql.IResult<Localitate[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      "SELECT denumire_localitate FROM Localitate"
    );
    return rezultat;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function getIdLocalitate(
  denumire_localitate: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("denumire_localitate", mssql.NVarChar, denumire_localitate)
      .query(
        "SELECT id_localitate FROM Localitate WHERE denumire_localitate=@denumire_localitate"
      );

    return rezultat.recordset[0].id_localitate;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}
