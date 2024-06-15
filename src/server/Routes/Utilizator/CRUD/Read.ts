import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Utilizator } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

export async function getIdUtilizator(
  nume_utilizator: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .query(
        "SELECT id_utilizator FROM Utilizator WHERE nume_utilizator = @nume_utilizator"
      );
    return rezultat.recordset[0].id_utilizator;
  } catch (eroare) {
    console.log("Au existat probleme la obtinerea idUtilizator: ", eroare);
    throw eroare;
  }
}

export async function getUtilizatori(): Promise<mssql.IResult<Utilizator[]>> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT * FROM Utilizator");
    return rezultat;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  }
}

export async function getUtilizator(
  id_utilizator: string
): Promise<mssql.IResult<Utilizator | undefined>> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_utilizator", mssql.Int, id_utilizator)
      .query("SELECT * FROM Utilizator WHERE id_utilizator = @id_utilizator");

    return rezultat;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}

export async function getUtilizatorCuLocalitate(
  id_utilizator: number
): Promise<Utilizator> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_utilizator", mssql.Int, id_utilizator)
      .query(
        "SELECT id_utilizator, email, nume_utilizator, parola, data_inscriere, telefon, strada, numar, denumire_localitate as localitate, poza FROM Utilizator as ut JOIN Localitate as l ON ut.localitate = l.id_localitate WHERE id_utilizator = @id_utilizator"
      );

    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}

export async function getAuthUtilizator(
  nume_utilizator: string
): Promise<Utilizator> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .query(
        "SELECT * FROM Utilizator WHERE nume_utilizator = @nume_utilizator"
      );
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("Au existat probleme la obtinerea idUtilizator: ", eroare);
    throw eroare;
  }
}

export async function verificareTipUtilizator(
  id_utilizator: number
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const rezultat = await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .query("SELECT COUNT(*) FROM Firma WHERE id_utilizator=@id_utilizator");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log(
      "A existat o eroare la verificarea tipului utilizatorului: ",
      eroare
    );
    throw eroare;
  }
}

export async function getNumarUtilizatori(): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(
      "SELECT COUNT(id_utilizator) as utilizatoriNoi FROM Utilizator WHERE data_inscriere=CAST(GETDATE() AS DATE)"
    );
    return rezultat.recordset[0].utilizatoriNoi;
  } catch (eroare) {
    throw new ExpressError(
      "Au existat probleme la interogarea numărului de utilizatori înregistrați astăzi Routes/administrator/CRUD/SQL/Read/SQL",
      500
    );
  }
}

export async function getMedieUtilizatori(): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query(`
    SELECT 
        AVG(CAST(utilizatoriNoi AS DECIMAL(10,2))) AS medieUtilizatoriSaptamana
    FROM (
        SELECT 
            ISNULL(COUNT(u.id_utilizator), 0) AS utilizatoriNoi
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
            ) AS d (data_inscriere)
        LEFT JOIN 
            Utilizator u ON d.data_inscriere = CAST(u.data_inscriere AS DATE)
        GROUP BY 
            d.data_inscriere
        ) AS T;`);
    return rezultat.recordset[0].medieUtilizatoriSaptamana;
  } catch (eroare) {
    throw new ExpressError(
      "Au existat probleme la interogarea mediei de utilizatori înregistrați astăzi Routes/administrator/CRUD/SQL/Read/SQL",
      500
    );
  }
}
