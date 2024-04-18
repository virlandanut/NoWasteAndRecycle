import mssql from "mssql";
import { pool } from "../configurare.js";
import {
  Container,
  ContainerInchiriere,
  PretContainer,
} from "../../../interfaces/Interfete_Container.js";

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
    console.log(
      "A existat o eroare la adăugarea container-ului în baza de date: ",
      eroare
    );
  }
}

export async function getIdContainer(
  denumire_container: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("denumire_container", mssql.NVarChar, denumire_container)
      .query(
        `SELECT id_container FROM Container WHERE denumire=@denumire_container`
      );
    return rezultat.recordset[0].id_container;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea id_container din baza de date: ",
      eroare
    );
    throw eroare;
  }
}

export async function getContainereInchiriere(): Promise<
  mssql.IResult<ContainerInchiriere[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      `SELECT id_container, denumire, capacitate, status, strada, numar, id_utilizator, denumire_firma, status_aprobare, descriere
        FROM CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator 
            WHERE id_container NOT IN (SELECT container FROM Tip_container) AND status = 0 AND status_aprobare = 1`
    );
    return rezultat;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await conexiune.close();
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
      .query(`SELECT id_container, denumire, capacitate, status, strada, numar, id_utilizator, denumire_firma, status_aprobare, descriere 
        FROM CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator
        WHERE id_container = @id_container`);
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  }
}

export async function getPreturiContainerInchiriere(
  id_container: number
): Promise<PretContainer[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.input("id_container", mssql.Int, id_container)
      .query(`SELECT tp.denumire_tip_pret, pret 
              FROM (Container c JOIN Istoric_pret ip ON c.id_container = ip.container) JOIN Tip_pret tp ON ip.tip_pret = tp.id_tip_pret
              WHERE ip.container = @id_container AND ip.data_sfarsit IS NULL`);
    return rezultat.recordset;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  }
}

export async function validareDenumireContainer(
  denumite_container: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("denumire_container", mssql.NVarChar, denumite_container)
      .query(
        `SELECT COUNT(*) FROM Container WHERE denumire=@denumire_container`
      );
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("A existat o eroare la validarea denumirii containerului");
    throw eroare;
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
    console.log(
      "A existat o eroare la adăugarea prețului container-ului: ",
      eroare
    );
    throw eroare;
  }
}
