import express, { Router } from "express";
import { validareCNP, validareEmail, validareTelefon, validareUsername } from "../../BD/SQL_Utilizatori/utilizatori.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get("/username", async (request, response) => {
  const { username } = request.query;
  if (typeof username !== "string" || username.length < 8) {
    return response
      .status(400)
      .json({ eroare: "Numele de utilizator este invalid!" });
  }
  try {
    const countUsername = await validareUsername(username);
    response.json(countUsername);
  } catch (eroare) {
    response
      .status(500)
      .json({ eroare: "Au existat probleme la validarea username-ului" });
  }
});

router.get("/CNP", async (request, response) => {
  const { CNP } = request.query;
  if (typeof CNP !== "string" || CNP.length < 13) {
    return response.status(400).json({ eroare: "CNP-ul este invalid!" });
  }
  try {
    const countCNP = await validareCNP(CNP);
    response.json(countCNP);
  } catch (eroare) {
    response
      .status(500)
      .json({ eroare: "Au existat probleme la validarea CNP-ului!" });
  }
});

router.get("/telefon", async (request, response) => {
  const { telefon } = request.query;
  if (typeof telefon !== "string" || telefon.length < 10) {
    return response.status(400).json({ eroare: "Număr de telefon invalid!" });
  }
  try {
    const countTelefon = await validareTelefon(telefon);
    response.json(countTelefon);
  } catch (eroare) {
    response.status(500).json({
      eroare: "Au existat probleme la validarea numărului de telefon!",
    });
  }
});

router.get("/email", async (request, response) => {
  const { email } = request.query;
  if (typeof email !== "string") {
    return response
      .status(400)
      .json({ eroare: "Adresa de email este invalidă!" });
  }
  try {
    const countEmail = await validareEmail(email);
    response.json(countEmail);
  } catch (eroare) {
    response.status(500).json({
      eroare: "Au existat probleme la validarea adresei de email!",
    });
  }
});

export default router;