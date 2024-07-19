import { body } from "express-validator";
import prisma from "../../../prisma/client.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

class ValidatorFirma {
  verificareCreareFirma() {
    return [
      body("email")
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage("Email invalid"),
      body("nume_utilizator")
        .notEmpty()
        .isString()
        .isLength({ min: 8 })
        .withMessage("Nume de utilizator invalid"),
      body("parola").notEmpty().isString().withMessage("Parola invalidă"),
      body("telefon")
        .notEmpty()
        .isString()
        .matches(/^\d+$/)
        .matches(/^(07)(?=[2-9])[0-9]{8}$/)
        .withMessage("Telefonul este invalid"),
      body("strada").notEmpty().isString().withMessage("Strada este invalidă"),
      body("numar")
        .notEmpty()
        .isString()
        .withMessage("Numărul străzii este invalid"),
      body("localitate")
        .notEmpty()
        .isString()
        .withMessage("Numele localității este invalid"),
      body("denumire_firma")
        .notEmpty()
        .isString()
        .matches(/^[A-Z][A-Za-z\s]*\s?(SRL|PFA)$/)
        .withMessage("Denumirea firmei este invalidă"),
      body("cif")
        .notEmpty()
        .custom(validareCIF)
        .withMessage("CIF-ul este invalid"),
      body("caen")
        .notEmpty()
        .custom(validareCAEN)
        .withMessage("CAEN-ul nu este invalid"),
    ];
  }
}

const validareCIF = (valoare: string) => {
  const cheie = "753217532";
  if (typeof valoare !== "string") {
    throw new ExpressError("CIF-ul trebuie să fie un string", 500);
  }
  let cif = valoare.toUpperCase();
  cif = cif.indexOf("RO") > -1 ? cif.substring(2) : cif;
  cif = cif.replace(/\s/g, "");
  if (cif.length < 2 || cif.length > 10) {
    throw new ExpressError("Lungimea CIF-ului este invalida", 500);
  }
  if (Number.isNaN(parseInt(cif))) {
    throw new ExpressError("CIF-ul nu este valid!", 500);
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
    throw new ExpressError("CIF Invalid", 500);
  }

  return true;
};

const validareCAEN = async (valoare: string) => {
  try {
    const codCaen = await prisma.caen.findUnique({
      where: { cod_caen: parseInt(valoare) },
    });
    if (codCaen) {
      return true;
    } else {
      throw new ExpressError("CAEN Invalid!", 500);
    }
  } catch (eroare) {
    console.log(eroare);
    throw new ExpressError("Eroare la verificarea codului CAEN", 500);
  }
};

export default new ValidatorFirma();
