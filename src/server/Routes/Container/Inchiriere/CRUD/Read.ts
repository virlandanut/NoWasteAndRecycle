import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ContainerInchiriere } from "../../../../../client/views/Container/ArataContainer/Depozitare/Interfete.js";
import { MetriceContainere } from "../../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function getContainereInchiriere(): Promise<
  mssql.IRecordSet<ContainerInchiriere[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      `SELECT id_container, denumire, capacitate, status, strada, numar, lat as latitudine, long as longitudine, denumire_localitate as localitate, firma, denumire_firma, status_aprobare, descriere
        FROM (CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator) JOIN Localitate as l ON c.localitate = l.id_localitate
          WHERE id_container NOT IN (SELECT container FROM Tip_container) AND status = 0 AND status_aprobare = 1`
    );
    return rezultat.recordset;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea containerelor de depozitare din baza de date: ",
      eroare
    );
    throw eroare;
  }
}

export async function getContainerInchiriere(
  id_container: number
): Promise<ContainerInchiriere> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.input("id_container", mssql.Int, id_container)
      .query(`SELECT id_container, denumire, capacitate, status, strada, numar, denumire_localitate as localitate, lat as latitudine, long as longitudine, firma, denumire_firma, status_aprobare, descriere 
        FROM (CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator) JOIN Localitate as l ON c.localitate = l.id_localitate
        WHERE id_container = @id_container AND id_container NOT IN (SELECT container FROM Tip_container)`);
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  }
}

export async function getContainereInchiriereSapt(): Promise<
  MetriceContainere[]
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      ` SELECT 
            ISNULL(COUNT(c.id_container), 0) AS numarContainere, d.data_adaugare
        FROM 
            (
                VALUES 
                    (CONVERT(DATE, DATEADD(DAY, -7, GETDATE()))),
                    (CONVERT(DATE, DATEADD(DAY, -6, GETDATE()))),
                    (CONVERT(DATE, DATEADD(DAY, -5, GETDATE()))),
                    (CONVERT(DATE, DATEADD(DAY, -4, GETDATE()))),
                    (CONVERT(DATE, DATEADD(DAY, -3, GETDATE()))),
                    (CONVERT(DATE, DATEADD(DAY, -2, GETDATE()))),
                    (CONVERT(DATE, DATEADD(DAY, -1, GETDATE())))
            ) AS d (data_adaugare)
        LEFT JOIN 
            Container c ON d.data_adaugare = CAST(c.data_adaugare AS DATE) AND c.id_container NOT IN (SELECT container from Tip_container)
        GROUP BY 
            d.data_adaugare`
    );
    return rezultat.recordset;
  } catch (eroare) {
    throw new ExpressError(
      "Au existat probleme la interogarea numărului de containere de închiriere săptămâna trecută Routes/administrator/CRUD/Read/SQL",
      500
    );
  }
}
