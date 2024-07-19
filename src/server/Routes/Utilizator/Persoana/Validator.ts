import { body } from "express-validator";
class ValidatorPersoana {
  verificareCrearePersoana() {
    return [
      body("email").notEmpty().isString().isEmail(),
      body("nume_utilizator").notEmpty().isLength({ min: 8 }).isString(),
      body("parola").notEmpty().isString(),
      body("telefon")
        .notEmpty()
        .isString()
        .matches(/^\d+$/)
        .matches(/^(07)(?=[2-9])[0-9]{8}$/),
      body("strada").notEmpty().isString(),
      body("numar").notEmpty().isString(),
      body("localitate").notEmpty().isString(),
      body("nume")
        .notEmpty()
        .isString()
        .matches(/^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/),
      body("prenume")
        .notEmpty()
        .isString()
        .matches(/^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/),
      body("cnp")
        .notEmpty()
        .isString()
        .isLength({ min: 13 })
        .matches(/^[1|2|5|6][0-9]{12}$/),
    ];
  }
}

export default new ValidatorPersoana();
