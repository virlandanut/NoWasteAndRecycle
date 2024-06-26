import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import {
  ComentariuTichet,
  TichetCuNume,
  TichetRaportare,
} from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

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
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Tichetele nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

export async function getToateTichetelePersoane(): Promise<TichetCuNume[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = await pool.request();
    const rezultat = await cerere.query(
      "SELECT id_raport_problema, titlu, status, data, CONCAT(nume, ' ', prenume) AS utilizator FROM Raport_problema AS rp JOIN Persoana_fizica AS pf ON rp.utilizator=pf.id_utilizator WHERE status=0"
    );
    return rezultat.recordset;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea tichetelor persoanelor din baza de date",
        500
      );
    }
  }
}

export async function getToateTicheteleFirme(): Promise<TichetCuNume[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = await pool.request();
    const rezultat = await cerere.query(
      "SELECT id_raport_problema, titlu, status, data, denumire_firma AS utilizator FROM Raport_problema AS rp JOIN Firma AS f ON rp.utilizator=f.id_utilizator WHERE status=0"
    );
    return rezultat.recordset;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea tichetelor firmelor din baza de date",
        500
      );
    }
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
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea id-ului tichetului de problemă din baza de date",
        500
      );
    }
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
        `SELECT id_raport_problema, utilizator, titlu, mesaj, data, status FROM Raport_problema WHERE id_raport_problema=@id_raport_problema`
      );
    return rezultat.recordset[0];
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea tichetului de problemă din baza de date",
        500
      );
    }
  }
}

export async function getProprietarTichet(
  id_raport_problema: number
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .query(
        "SELECT utilizator FROM Raport_problema WHERE id_raport_problema=@id_raport_problema"
      );
    return rezultat.recordset[0].utilizator;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la interogarea proprietarului tichetului",
        400
      );
    }
  }
}

export async function getComentariiProprietarPersoana(
  id_raport_problema: number,
  id_proprietar: number
): Promise<ComentariuTichet[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .input("id_proprietar", mssql.Int, id_proprietar)
      .query(
        `SELECT id_comentariu, CONCAT(nume, ' ', prenume) as nume, mesaj, data FROM Comentariu as c JOIN Persoana_fizica as pf ON c.utilizator = pf.id_utilizator AND tichet_problema=@id_raport_problema AND pf.id_utilizator=@id_proprietar`
      );
    return rezultat.recordset;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea comentariilor proprietarului tichetului din baza de date",
        500
      );
    }
  }
}

export async function getComentariiProprietarFirma(
  id_raport_problema: number,
  id_proprietar: number
): Promise<ComentariuTichet[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .input("id_proprietar", mssql.Int, id_proprietar)
      .query(
        `SELECT id_comentariu, denumire_firma as nume, mesaj, data FROM Comentariu as c JOIN Firma as f ON c.utilizator = f.id_utilizator AND tichet_problema=@id_raport_problema AND f.id_utilizator=@id_proprietar`
      );
    return rezultat.recordset;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea comentariilor proprietarului tichetului din baza de date",
        500
      );
    }
  }
}

export async function getComentariiAdministrator(
  id_raport_problema: number
): Promise<ComentariuTichet[]> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_raport_problema", mssql.Int, id_raport_problema)
      .query(
        `SELECT id_comentariu, CONCAT(nume, ' ', prenume) as nume, mesaj, data, rol FROM Comentariu as c JOIN Persoana_fizica as pf ON c.utilizator = pf.id_utilizator AND tichet_problema=@id_raport_problema AND rol='administrator'`
      );
    return rezultat.recordset;
  } catch (eroare) {
    if (eroare instanceof mssql.MSSQLError) {
      throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la interogarea comentariilor administratorului",
        400
      );
    }
  }
}
