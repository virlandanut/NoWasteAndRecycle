import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { Persoana } from "../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";

// export async function adaugaPersoana(persoana: Persoana): Promise<void> {
//   let conexiune;
//   try {
//     const { id_utilizator, nume, prenume, cnp, rol } = persoana;
//     conexiune = await pool.connect();
//     await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .input("nume", mssql.NVarChar, nume)
//       .input("prenume", mssql.NVarChar, prenume)
//       .input("cnp", mssql.NVarChar, cnp)
//       .input("rol", mssql.NVarChar, rol)
//       .query(`INSERT INTO Persoana_fizica(id_utilizator, nume, prenume, cnp, rol)
//       VALUES(@id_utilizator, @nume, @prenume, @cnp, @rol)`);
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la adăugarea persoanei în baza de date",
//         500
//       );
//     }
//   }
// }
