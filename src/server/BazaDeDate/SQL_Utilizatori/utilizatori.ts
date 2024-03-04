import mssql from "mssql";
import { pool } from "../configurare.js";
import { Utilizator } from "../../interfaces.js";
import { criptareParola } from "../Bcrypt/criptare.js";

export async function getUtilizatori(): Promise<
  mssql.IResult<Utilizator[]> | undefined
> {
  try {
    await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT * FROM Utilizator");
    return rezultat;
  } catch (eroare) {
    console.log("A existat o eroare la interogarea bazei de date: ", eroare);
    throw eroare;
  } finally {
    await pool.close();
  }
}

export async function getUtilizator(
  idUtilizator: string
): Promise<mssql.IResult<Utilizator | undefined>> {
  try {
    await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("idUtilizator", mssql.Int, idUtilizator)
      .query("SELECT * FROM Utilizator WHERE idUtilizator = @idUtilizator");

    return rezultat;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  } finally {
    await pool.close();
  }
}

export async function adaugaUtilizator(
  email: string,
  username: string,
  parola: string,
  data: Date,
  telefon: string,
  adresa: string,
  rol: string
): Promise<void> {
  try {
    await pool.connect();
    const parolaCriptata = await criptareParola(parola);
    await pool
      .request()
      .input("username", mssql.NVarChar, username)
      .input("parola", mssql.NVarChar, parolaCriptata)
      .input("data", mssql.Date, data)
      .input("email", mssql.NVarChar, email)
      .input("telefon", mssql.NVarChar, telefon)
      .input("adresa", mssql.NVarChar, adresa)
      .input("rol", mssql.NVarChar, rol)
      .query(`INSERT INTO Utilizator(email, username, parola, dataInscriere, telefon, adresa, rol)
      VALUES(@email, @username, @parola, @data, @telefon, @adresa, @rol)`);
  } catch (eroare: any) {
    if (eroare.code === "EREQUEST") {
      console.log("SQL Error: ", eroare.message);
      if (
        eroare.originalError &&
        eroare.originalError.info &&
        eroare.originalError.info.message
      ) {
        console.log(
          "Specific SQL error message:",
          eroare.originalError.info.message
        );
      }
    } else {
      console.log("Other error:", eroare);
    }
  } finally {
    await pool.close();
  }
}
