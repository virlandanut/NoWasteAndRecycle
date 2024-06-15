import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ContainerReciclare } from "../../../../../client/views/Container/ArataContainer/Reciclare/Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { MetriceContainere } from "../../Interfete.js";

export async function getContainereReciclare(): Promise<
  mssql.IRecordSet<ContainerReciclare[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      `SELECT id_container, denumire, capacitate, status, strada, numar, lat as latitudine, long as longitudine, denumire_localitate as localitate, firma, denumire_firma, status_aprobare, descriere, denumire_tip as tip FROM (((CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator) JOIN Localitate as l ON c.localitate = l.id_localitate) JOIN Tip_container as tp ON c.id_container = tp.container) JOIN Tip_deseu as td ON tp.tip_deseu = td.id_tip WHERE td.id_tip <> 1011`
    );
    return rezultat.recordset;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea containerelor de reciclare din baza de date: ",
      eroare
    );
    throw eroare;
  }
}

export async function getContainereReciclareFiltrate(
  tip: string
): Promise<mssql.IRecordSet<ContainerReciclare[]>> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("tip", mssql.NVarChar, tip)
      .query(
        `SELECT id_container, denumire, capacitate, status, strada, numar, lat as latitudine, long as longitudine, denumire_localitate as localitate, firma, denumire_firma, status_aprobare, descriere, denumire_tip as tip FROM (((CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator) JOIN Localitate as l ON c.localitate = l.id_localitate) JOIN Tip_container as tp ON c.id_container = tp.container) JOIN Tip_deseu as td ON tp.tip_deseu = td.id_tip WHERE tip=@tip`
      );
    return rezultat.recordset;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea containerelor filtrate de reciclare din baza de date: ",
      eroare
    );
    throw eroare;
  }
}

export async function getContainerReciclare(
  id_container: number
): Promise<ContainerReciclare> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.input("id_container", mssql.Int, id_container)
      .query(`SELECT id_container, denumire, capacitate, status, strada, numar, denumire_localitate as localitate, lat as latitudine, long as longitudine, firma, denumire_firma, status_aprobare, descriere, denumire_tip as tip 
      FROM (((CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator) JOIN Localitate as l ON c.localitate = l.id_localitate) JOIN Tip_container as tc ON c.id_container = tc.container) JOIN Tip_deseu as td ON tc.tip_deseu = td.id_tip
        WHERE id_container = @id_container`);
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  }
}

export async function getContainereReciclareSapt(): Promise<
  MetriceContainere[]
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      `
      SELECT 
          COUNT(c.id_container) AS numarContainere, d.data_adaugare
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
          Container c 
          ON d.data_adaugare = CAST(c.data_adaugare AS DATE) AND c.id_container IN (SELECT container FROM Tip_container WHERE tip_deseu <> 1011)
      GROUP BY 
          d.data_adaugare;
      `
    );
    return rezultat.recordset;
  } catch (eroare) {
    throw new ExpressError(
      "Au existat probleme la interogarea numărului de containere de reciclare săptămâna trecută Routes/administrator/CRUD/Read/SQL",
      500
    );
  }
}
