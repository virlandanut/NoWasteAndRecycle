import mssql, { IRecordSet } from "mssql";
import { pool } from "../../../../DB/configurare.js";
import { RaportUtilizator, TichetRaportare } from "../../Interfete.js";

export async function getTicheteRaport(
  id_utilizator: number
): Promise<TichetRaportare[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_utilizator", mssql.Int, id_utilizator)
      .query(`SELECT * FROM Raport_Problema WHERE utilizator=@id_utilizator`);
    return rezultat.recordset;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea tichetelor de probleme din baza de date: ",
      eroare
    );
    throw eroare;
  }
}

export async function getIdTichet(numar_tichet: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("numar_tichet", mssql.NVarChar, numar_tichet)
      .query(
        `SELECT id_raport_problema FROM Raport_problema WHERE numar_tichet=@numar_tichet`
      );
    return rezultat.recordset[0].id_raport_problema;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea id-ului tichetului de problemă din baza de date: ",
      eroare
    );
    throw eroare;
  }
}

export async function getTichet(
  id_raport_problema: number
): Promise<TichetRaportare> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .query(
        `SELECT utilizator, titlu, mesaj, data, status FROM Raport_problema WHERE id_raport_problema=@id_raport_problema`
      );
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea tichetului de problemă din baza de date!",
      eroare
    );
    throw eroare;
  }
}
