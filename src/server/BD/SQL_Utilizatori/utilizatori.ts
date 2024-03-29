import mssql from "mssql";
import { pool } from "../configurare.js";
import { Firma, Persoana, Utilizator } from "../../../../interfaces.js";

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
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

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
  } finally {
    if (conexiune) {
      await conexiune.close();
    }
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
  } finally {
    if (conexiune) {
      await conexiune.close();
    }
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
      .query("SELECT * FROM Utilizator WHERE id_utilizator = @idUtilizator");

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
  } finally {
    if (conexiune) {
      await pool.close();
    }
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
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}

export async function adaugaUtilizator(utilizator: Utilizator): Promise<void> {
  let conexiune;
  try {
    const { nume_utilizator, parola, data_inscriere, email, telefon, adresa } =
      utilizator;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
      .input("parola", mssql.NVarChar, parola)
      .input("data_inscriere", mssql.Date, data_inscriere)
      .input("email", mssql.NVarChar, email)
      .input("telefon", mssql.NVarChar, telefon)
      .input("adresa", mssql.NVarChar, adresa)
      .query(`INSERT INTO Utilizator(email, nume_utilizator, parola, data_inscriere, telefon, adresa)
      VALUES(@email, @nume_utilizator, @parola, @data_inscriere, @telefon, @adresa)`);
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
    const { id_utilizator, nume, prenume, cnp, rol } = persoana;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("nume", mssql.NVarChar, nume)
      .input("prenume", mssql.NVarChar, prenume)
      .input("cnp", mssql.NVarChar, cnp)
      .input("rol", mssql.NVarChar, rol)
      .query(`INSERT INTO Persoana_fizica(id_utilizator, nume, prenume, cnp, rol)
      VALUES(@id_utilizator, @nume, @prenume, @cnp, @rol)`);
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

export async function adaugaFirma(firma: Firma): Promise<void> {
  let conexiune;
  try {
    const { id_utilizator, denumire_firma, cif, caen } = firma;
    conexiune = await pool.connect();
    await pool
      .request()
      .input("id_utilizator", mssql.Int, id_utilizator)
      .input("denumire_firma", mssql.NVarChar, denumire_firma)
      .input("cif", mssql.NVarChar, cif)
      .input("caen", mssql.Int, caen)
      .query(
        "INSERT INTO Firma(id_utilizator, denumire_firma, cif, caen) VALUES(@id_utilizator, @denumire_firma, @cif, @caen)"
      );
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
