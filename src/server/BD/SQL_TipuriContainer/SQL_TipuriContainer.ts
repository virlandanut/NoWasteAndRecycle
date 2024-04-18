import mssql from "mssql";
import { pool } from "../configurare.js";
import { TipContainer } from "../../../interfaces/Interfete_Container.js";

export async function getTipuriContainer(): Promise<
  mssql.IRecordSet<TipContainer[]>
> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere.query("SELECT denumire_tip FROM Tip_deseu");
    return rezultat.recordset;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea tipurilor de containere: ",
      eroare
    );
    throw eroare;
  }
}

export async function getIdTipContainer(denumire_tip: string): Promise<number> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("denumire_tip", mssql.NVarChar, denumire_tip)
      .query(`SELECT id_tip FROM Tip_deseu WHERE denumire_tip=@denumire_tip`);
    return rezultat.recordset[0].id_tip;
  } catch (eroare) {
    console.log(
      "A existat o eroare la interogarea tipurilor de containere: ",
      eroare
    );
    throw eroare;
  }
}

export async function adaugaTipContainer(
  id_container: number,
  id_tip_deseu: number
): Promise<void> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    await cerere
      .input("id_container", mssql.Int, id_container)
      .input("id_tip_deseu", mssql.Int, id_tip_deseu)
      .query(
        "INSERT INTO Tip_container(container, tip_deseu) VALUES(@id_container, @id_tip_deseu)"
      );
  } catch (eroare) {
    console.log(
      "A existat o eroare la adăugarea tipului de container: ",
      eroare
    );
    throw eroare;
  }
}
