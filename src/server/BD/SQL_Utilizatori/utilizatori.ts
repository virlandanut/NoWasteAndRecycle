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

export async function adaugaUtilizator(utilizator: Utilizator): Promise<void> {
  try {
    const { username, parola, dataInscriere, email, telefon, adresa, rol } =
      utilizator;
    await pool.connect();
    await pool
      .request()
      .input("username", mssql.NVarChar, username)
      .input("parola", mssql.NVarChar, parola)
      .input("data", mssql.Date, dataInscriere)
      .input("email", mssql.NVarChar, email)
      .input("telefon", mssql.NVarChar, telefon)
      .input("adresa", mssql.NVarChar, adresa)
      .input("rol", mssql.NVarChar, rol)
      .query(`INSERT INTO Utilizator(email, username, parola, dataInscriere, telefon, adresa, rol)
      VALUES(@email, @username, @parola, @data, @telefon, @adresa, @rol)`);
  } catch (eroare) {
    console.log(
      "A existat o eroare la adăugarea utilizatorului în baza de date: ",
      eroare
    );
  } finally {
    await pool.close();
  }
}
