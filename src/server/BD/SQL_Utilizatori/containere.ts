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
      `SELECT idContainer, c.denumire, capacitate, tarif, c.status, adresa,idUtilizator as idFirma, f.Denumire as firma, f.statusAp 
        FROM CONTAINER as c JOIN Firma as f ON c.firma = f.idUtilizator 
            WHERE idContainer NOT IN (SELECT idContainer FROM tipContainer) AND status = 0`
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
  idContainer: number
): Promise<ContainerInchiriere> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.input("idContainer", mssql.Int, idContainer)
      .query(`SELECT idContainer, c.denumire, capacitate, tarif, c.status, adresa,idUtilizator as idFirma, f.Denumire as firma, f.statusAp 
        FROM CONTAINER as c JOIN Firma as f ON c.firma = f.idUtilizator
        WHERE idContainer = @idContainer`);
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
