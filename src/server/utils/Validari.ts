import Joi from "joi";
import { getCoduriCaen } from "../DB/SQL_CAEN/SQL_CAEN.js";
import bcrypt from "bcrypt";
import { codCAEN } from "../Interfete/Interfete_CAEN.js";

export const validareJoiCIF = (
  valoare: string,
  helpers: Joi.CustomHelpers<string>
) => {
  const cheie = "753217532";
  if (typeof valoare !== "string") {
    throw new Error("CIF-ul trebuie să fie un string");
  }
  let cif = valoare.toUpperCase();
  cif = cif.indexOf("RO") > -1 ? cif.substring(2) : cif;
  cif = cif.replace(/\s/g, "");
  if (cif.length < 2 || cif.length > 10) {
    throw new Error("Lungimea CIF-ului este invalida");
  }
  if (Number.isNaN(parseInt(cif))) {
    throw new Error("CIF-ul nu este valid!");
  }

  const numarControl = parseInt(cif.substring(cif.length - 1));
  cif = cif.substring(0, cif.length - 1);

  while (cif.length !== cheie.length) {
    cif = "0" + cif;
  }

  let suma = 0;
  let i = cif.length;
  while (i--) {
    suma += parseInt(cif.charAt(i)) * parseInt(cheie.charAt(i));
  }

  let calculareNumarControl = (suma * 10) % 11;

  if (calculareNumarControl === 10) {
    calculareNumarControl = 0;
  }

  if (numarControl !== calculareNumarControl) {
    throw new Error("CIF Invalid");
  }

  return valoare;
};

export const validareJoiCAEN = async (
  valoare: string,
  helpers: Joi.CustomHelpers<string>
) => {
  try {
    const coduriCaen = await getCoduriCaen();
    if (coduriCaen) {
      const coduriCaenString = coduriCaen.recordset.map(
        (cod: codCAEN) => cod.cod_caen
      );
      if (coduriCaenString.includes(parseInt(valoare))) {
        return valoare;
      } else {
        throw new Error("CAEN Invalid!");
      }
    } else {
      throw new Error(
        "Probleme la interogarea bazei de date a codurilor CAEN!"
      );
    }
  } catch (eroare) {
    console.log(eroare);
  }
};

export async function comparaParole(
  parola: string,
  parolaCriptata: string
): Promise<boolean> {
  return await bcrypt.compare(parola, parolaCriptata);
}
