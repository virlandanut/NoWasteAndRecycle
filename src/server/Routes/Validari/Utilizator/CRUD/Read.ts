import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

export async function validareUsername(
  nume_utilizator: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .query(
        "SELECT COUNT(*) FROM Utilizator WHERE nume_utilizator=@nume_utilizator"
      );
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}

export async function validareUsernameSchimbareDate(
  id_utilizator: number,
  nume_utilizator: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = conexiune.request();
    const rezultat = await cerere
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .query(
        "SELECT COUNT(*) FROM Utilizator WHERE nume_utilizator=@nume_utilizator AND id_utilizator <> @id_utilizator"
      );
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    throw new ExpressError("Numele de utilizator nu a putut fi validat", 500);
  }
}

export async function validareCNP(cnp: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("cnp", mssql.NVarChar, cnp)
      .query("SELECT COUNT(*) FROM Persoana_fizica WHERE cnp=@cnp");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}

export async function validareTelefon(telefon: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("telefon", mssql.NVarChar, telefon)
      .query("SELECT COUNT(*) FROM Utilizator WHERE telefon=@telefon");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}

export async function validareTelefonSchimbareDate(
  id_utilizator: number,
  telefon: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const rezultat = await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("telefon", mssql.NVarChar, telefon)
      .query(
        "SELECT COUNT(*) FROM Utilizator WHERE telefon=@telefon AND id_utilizator <> @id_utilizator"
      );
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    throw new ExpressError(
      "Au existat probleme la validarea numărului de telefon",
      500
    );
  }
}

export async function validareEmail(email: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("email", mssql.NVarChar, email)
      .query("SELECT COUNT(*) FROM Utilizator WHERE email=@email");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}

export async function validareEmailSchimbareDate(
  id_utilizator: number,
  email: string
): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("email", mssql.NVarChar, email)
      .query(
        "SELECT COUNT(*) FROM Utilizator WHERE email=@email AND id_utilizator <> @id_utilizator"
      );
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    throw new ExpressError("Au existat probleme la validarea email-ului", 500);
  }
}

export async function validareCIF(cif: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("cif", mssql.NVarChar, cif)
      .query("SELECT COUNT(*) FROM Firma WHERE cif=@cif");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  }
}
