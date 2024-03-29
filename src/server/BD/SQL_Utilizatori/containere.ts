import mssql from "mssql";
import { pool } from "../configurare.js";
import { ContainerInchiriere } from "../../../../interfaces.js";

export async function getContainereInchiriere(): Promise<
  mssql.IResult<ContainerInchiriere[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      `SELECT id_container, denumire, capacitate, status, adresa, id_utilizator, denumire_firma, status_aprobare 
        FROM CONTAINER as c JOIN Firma as f ON c.firma = f.idUtilizator 
            WHERE id_container NOT IN (SELECT container FROM Tip_container) AND status = 0 AND status_aprobare = 1`
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

export async function getContainerInchiriere(
  id_container: number
): Promise<ContainerInchiriere> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.input("id_container", mssql.Int, id_container)
      .query(`SELECT id_container, denumire, capacitate, status, adresa, id_utilizator, denumire_firma, status_aprobare 
        FROM CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator
        WHERE id_container = @id_container`);
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}
