import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Container } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function adaugaContainer(container: Container): Promise<void> {
  try {
    const {
      denumire,
      capacitate,
      strada,
      numar,
      firma,
      descriere,
      localitate,
      latitudine,
      longitudine,
    } = container;
    await pool
      .request()
      .input("firma", mssql.Int, firma)
      .input("denumire", mssql.NVarChar, denumire)
      .input("capacitate", mssql.Int, capacitate)
      .input("descriere", mssql.NVarChar, descriere)
      .input("strada", mssql.NVarChar, strada)
      .input("numar", mssql.NVarChar, numar)
      .input("localitate", mssql.Int, localitate)
      .input("latitudine", mssql.Float, latitudine)
      .input("longitudine", mssql.Float, longitudine)
      .query(
        `INSERT INTO Container(firma, denumire, capacitate, lat, long, descriere, strada, numar, localitate) VALUES(@firma, @denumire, @capacitate, @latitudine, @longitudine, @descriere, @strada, @numar, @localitate)`
      );
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la adăugarea container-ului în baza de date",
        500
      );
    }
  }
}

export async function adaugaPret(
  id_container: number,
  id_tip_pret: number,
  pret: string,
  data_inceput: Date
): Promise<void> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    await cerere
      .input("id_container", mssql.Int, id_container)
      .input("id_tip_pret", mssql.Int, id_tip_pret)
      .input("pret", mssql.Int, parseInt(pret))
      .input("data_inceput", mssql.Date, data_inceput)
      .query(
        `INSERT INTO Istoric_pret(tip_pret, container, pret, data_inceput) VALUES (@id_tip_pret, @id_container, @pret, @data_inceput)`
      );
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la adăugarea prețului container-ului",
        500
      );
    }
  }
}
