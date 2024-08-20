import { Request, Response } from "express";
import { comparaParole } from "../Utils/Validari.js";
import { Utilizator } from "@prisma/client";
import { ExpressError } from "../Utils/ExpressError.js";
import cloudinary from "../Servicii/serviciu-cloudinary.js";
import {
  getNumarPersoaneInregistrate,
  getPersoanaFizica,
} from "../Models/PersoanaModel.js";
import {
  getFirma,
  getFirmaCuId,
  getNumarFirmeInregistrate,
} from "../Models/FirmaModel.js";
import {
  getMedieUtilizatori,
  getNumarUtilizatori,
  getUtilizatorCuEmailSiNumeUtilizator,
  getUtilizatorCuId,
  getUtilizatorCuNumeUtilizator,
  updateParola,
  updatePozaProfil,
} from "../Models/UtilizatorModel.js";
import Nodemailer from "nodemailer";
import Password from "generate-password";
import dotenv from "dotenv";
dotenv.config();

export async function getTipUtilizator(request: Request, response: Response) {
  const id: number = parseInt(request.params.id);

  const [persoana, firma] = await Promise.all([
    getPersoanaFizica(id),
    getFirmaCuId(id),
  ]);

  if (!persoana && !firma) {
    return response
      .status(404)
      .json({ mesaj: "Utilizatorul nu există în baza de date" });
  }

  if (persoana) {
    return response.status(200).json({ tip: "PERSOANA", persoana });
  } else {
    return response.status(200).json({ tip: "FIRMA", firma });
  }
}

export async function login(request: Request, response: Response) {
  const { nume_utilizator, parola } = request.body;

  const utilizator = await getUtilizatorCuNumeUtilizator(nume_utilizator);

  if (!utilizator) {
    return response.status(401).json({ eroare: "Datele sunt incorecte!" });
  }
  const comparareParole = await comparaParole(parola, utilizator.parola);

  if (!comparareParole) {
    return response.status(401).json({ eroare: "Datele sunt incorecte!" });
  }

  request.session.utilizator = utilizator;
  response
    .status(200)
    .json({ success: true, message: "Autentificare reușită!" });
}

export function logout(request: Request, response: Response) {
  request.session.destroy((eroare) => {
    if (eroare) {
      response.status(500).json({ eroare: "Eroare de server" });
    } else {
      response.status(200).json({ success: true, message: "Logged out" });
    }
  });
}

export async function updatePassword(request: Request, response: Response) {
  const { idUtilizator, parolaVeche, parolaNoua } = request.body;
  const utilizator = await getUtilizatorCuId(idUtilizator);

  if (!utilizator) {
    return response.status(404).json({ mesaj: "Utilizatorul nu a fost găsit" });
  }

  const esteAceeasiParola = await comparaParole(parolaVeche, utilizator.parola);

  if (!esteAceeasiParola) {
    return response.status(401).json({ mesaj: "Parola curentă este eronată!" });
  }

  await updateParola(idUtilizator, parolaNoua);

  return response.status(200).json({ parolaActualizata: "true" });
}

export async function resetPassword(request: Request, response: Response) {
  const { nume_utilizator, email } = request.body;
  const utilizator: Utilizator | null =
    await getUtilizatorCuEmailSiNumeUtilizator(nume_utilizator, email);
  if (!utilizator) {
    return response.status(200).send();
  } else {
    const parolaNoua: string = Password.generate({
      length: 10,
      numbers: true,
    });

    await updateParola(utilizator.id_utilizator, parolaNoua);

    let nume: string = "";
    switch (utilizator.rol) {
      case "FIRMA":
        nume = (await getFirma(utilizator.id_utilizator)).denumire_firma;
        break;
      case "STANDARD":
        nume = (await getPersoanaFizica(utilizator.id_utilizator)).prenume;
        break;
      case "ADMINISTRATOR":
        nume = (await getPersoanaFizica(utilizator.id_utilizator)).prenume;
        break;
      default:
        nume = "client";
    }

    const transporter = Nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: {
        name: "Leafy 🌱",
        address: process.env.NODEMAILER_USER!,
      },
      to: `${email}`,
      subject: "Resetare parolă No Waste And Recycle",
      html: `<body>
        <p>Bună ${nume},</p>

        <p>Din câte am înțeles ai pierdut carnețelul cu parola contului tău pe cea mai minunată platformă de reciclare. Îți reamintesc că această parolă ar trebui schimbată cât mai repede posibil cu una pe care o știi doar tu!</p>

        <p>Parolă nouă: <span><strong>${parolaNoua}</strong><span></p>

        <p>Spor la reciclat! 😊</p>

        </body>`,
    });

    return response.status(200).send();
  }
}

export async function getUtilizatorCurent(
  request: Request,
  response: Response
) {
  if (request.session.utilizator) {
    const utilizator: Utilizator = request.session.utilizator;
    return response.status(200).json(utilizator);
  } else {
    return response
      .status(404)
      .json({ mesaj: "Sesiunea a expirat, vă rugăm să vă autentificați!" });
  }
}

export async function adaugarePozaProfil(request: Request, response: Response) {
  const utilizatorCurent: Utilizator | null = request.session.utilizator;
  if (!utilizatorCurent) {
    throw new ExpressError("Utilizatorul curent nu există", 500);
  }
  const pozaVeche: string | null = utilizatorCurent.poza;
  if (pozaVeche) {
    const publicId: string | undefined = pozaVeche
      .split("/")
      .pop()
      ?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }
  if (!request.body.data) {
    return response.status(500).json({ mesaj: "Imaginea nu a fost selectată" });
  }
  const fileStr = request.body.data;
  const raspunsUpload = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "nowasteandrecycle",
  });

  const utilizatorDupaModificare = await updatePozaProfil(
    utilizatorCurent.id_utilizator,
    raspunsUpload.url
  );

  request.session.utilizator = utilizatorDupaModificare;

  return response
    .status(200)
    .json({ mesaj: "Poza de profil a fost actualizată cu succes" });
}

export async function getUtilizatoriPortal(
  request: Request,
  response: Response
) {
  const utilizatoriNoi: number = await getNumarUtilizatori();
  let medieUtilizatori: number = await getMedieUtilizatori();

  return response.status(200).json({ utilizatoriNoi, medieUtilizatori });
}

export async function getUtilizatoriSaptamana(
  request: Request,
  response: Response
) {
  const firme = await getNumarFirmeInregistrate();
  const persoane = await getNumarPersoaneInregistrate();
  const numarFirme = firme.map((firma) => firma.numarFirme);
  const numarPersoane = persoane.map((persoana) => persoana.numarPersoane);
  const saptamana = firme.map((firma) =>
    firma.data_inscriere.toLocaleDateString()
  );

  return response.status(200).json({
    numarFirme,
    numarPersoane,
    saptamana,
  });
}
