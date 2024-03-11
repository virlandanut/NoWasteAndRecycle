import mssql from "mssql";
import { pool } from "../configurare.js";
import { Persoana, Utilizator } from "../../../../interfaces.js";

export async function getUtilizatori(): Promise<
  mssql.IResult<Utilizator[]> | undefined
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT * FROM Utilizator");
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

export async function validareUsername(username: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("username", mssql.NVarChar, username)
      .query("SELECT COUNT(*) FROM Utilizator WHERE username=@username");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await conexiune.close();
    }
  }
}

export async function validareCNP(CNP: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("CNP", mssql.NVarChar, CNP)
      .query("SELECT COUNT(*) FROM PersoanaFizica WHERE CNP=@CNP");
    return Object.values(rezultat.recordset[0])[0] as number;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await conexiune.close();
    }
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
  } finally {
    if (conexiune) {
      await conexiune.close();
    }
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
  } finally {
    if (conexiune) {
      await conexiune.close();
    }
  }
}

export async function getUtilizator(
  idUtilizator: string
): Promise<mssql.IResult<Utilizator | undefined>> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("idUtilizator", mssql.Int, idUtilizator)
      .query("SELECT * FROM Utilizator WHERE idUtilizator = @idUtilizator");

    return rezultat;
  } catch (eroare) {
    console.log("Eroare: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function getIdUtilizator(username: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("username", mssql.NVarChar, username)
      .query("SELECT idUtilizator FROM Utilizator WHERE username = @username");
    return rezultat.recordset[0].idUtilizator;
  } catch (eroare) {
    console.log("Au existat probleme la obtinerea idUtilizator: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function getAuthUtilizator(username: string): Promise<Utilizator> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("username", mssql.NVarChar, username)
      .query("SELECT * FROM Utilizator WHERE username = @username");
    return rezultat.recordset[0];
  } catch (eroare) {
    console.log("Au existat probleme la obtinerea idUtilizator: ", eroare);
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function adaugaUtilizator(utilizator: Utilizator): Promise<void> {
  let conexiune;
  try {
    const { username, parola, dataInscriere, email, telefon, adresa } =
      utilizator;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("username", mssql.NVarChar, username)
      .input("parola", mssql.NVarChar, parola)
      .input("data", mssql.Date, dataInscriere)
      .input("email", mssql.NVarChar, email)
      .input("telefon", mssql.NVarChar, telefon)
      .input("adresa", mssql.NVarChar, adresa)
      .query(`INSERT INTO Utilizator(email, username, parola, dataInscriere, telefon, adresa)
      VALUES(@email, @username, @parola, @data, @telefon, @adresa)`);
  } catch (eroare) {
    console.log(
      "A existat o eroare la adăugarea utilizatorului în baza de date: ",
      eroare
    );
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function adaugaPersoana(persoana: Persoana): Promise<void> {
  let conexiune;
  try {
    const { idUtilizator, nume, prenume, CNP, rol } = persoana;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("idUtilizator", mssql.Int, idUtilizator)
      .input("nume", mssql.NVarChar, nume)
      .input("prenume", mssql.NVarChar, prenume)
      .input("CNP", mssql.NVarChar, CNP)
      .input("rol", mssql.NVarChar, rol)
      .query(`INSERT INTO PersoanaFizica(idUtilizator, nume, prenume, CNP, rol)
      VALUES(@idUtilizator, @nume, @prenume, @CNP, @rol)`);
  } catch (eroare) {
    console.log(
      "A existat o eroare la adăugarea persoanei în baza de date: ",
      eroare
    );
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}
