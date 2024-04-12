import mssql from "mssql";
import { pool } from "../configurare.js";
import { TipContainer } from "../../../interfaces/Interfete_Container.js";

export async function getTipuriContainer(): Promise<
  mssql.IResult<TipContainer[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT denumire_tip FROM Tip_deseu");
    return rezultat;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea tipurilor de containere: ",
      eroare
    );
    throw eroare;
  } finally {
    if (conexiune) {
      await pool.close();
    }
  }
}
