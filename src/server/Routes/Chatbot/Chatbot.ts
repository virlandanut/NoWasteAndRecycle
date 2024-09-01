import { Firma, Persoana_fizica, Utilizator } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import Fuse from "fuse.js";
import { getPersoanaFizica } from "../../Models/PersoanaModel.js";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { getFirma } from "../../Models/FirmaModel.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

let raspunsuriPredefinite = [
  { question: "bună", reply: "Bună! Cum te pot ajuta? 🧐" },
  {
    question: "ce poți face?",
    reply:
      "Pot răspunde la întrebări și să îți ofer informații utile în cadrul aplicației No Waste and Recycle. 😊",
  },
  {
    question: "ce containere pot închiria",
    reply: "",
  },
  {
    question: "cum pot adăuga un container?",
    reply: "",
  },
  {
    question: "mulțumesc frumos pentru ajutor",
    reply: "Cu mare plăcere! Te mai pot ajuta cu ceva? 🧐",
  },
  {
    question: "asta este tot",
    reply: "Dacă mai ai nevoie de ajutor eu sunt aici pentru tine! 👋🏻",
  },
  {
    question: "la revedere",
    reply: "La revedere! Sper să ne mai auzim curând! 👋🏻",
  },
];

const fuse = new Fuse(raspunsuriPredefinite, {
  keys: ["question"],
  threshold: 0.3,
});

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const utilizatorCurent: Utilizator | null = request.session.utilizator;
    let mesaj: string = "";
    if (!utilizatorCurent) {
      return response
        .status(500)
        .json({ mesaj: "Utilizatorul curent nu există" });
    }

    if (utilizatorCurent.rol === "FIRMA") {
      const firma: Firma | null = await getFirma(
        utilizatorCurent.id_utilizator
      );
      mesaj = `Bună ${firma.denumire_firma}, numele meu este Leafy 🌱, cu ce vă pot fi de folos? 😊`;
    } else {
      const persoana: Persoana_fizica | null = await getPersoanaFizica(
        utilizatorCurent.id_utilizator
      );
      mesaj = `Bună ${persoana.prenume}, numele meu este Leafy 🌱, cu ce îți pot fi de folos? 😊`;
    }

    if (mesaj) {
      return response.status(200).json({ mesaj });
    } else {
      return response.status(200).json({
        mesaj:
          "Se pare că a avut loc o eroare. Te rog să contactezi un administrator!",
      });
    }
  })
);

router.post(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const { mesaj } = request.body;
    const utilizatorCurent: Utilizator = request.session.utilizator;
    let nume: string = "";
    await seteazăRăspunsuri(request, response, utilizatorCurent, nume);

    const rezultat = fuse.search(mesaj);
    let raspuns = `Îmi pare rău, nu am înțeles întrebarea ta${nume ? `, ${nume}` : ""}.`;

    if (rezultat.length > 0) {
      raspuns = rezultat[0].item.reply;
    }

    response.json({ raspuns });
  })
);

async function seteazăRăspunsuri(
  request: Request,
  response: Response,
  utilizatorCurent: Utilizator | null,
  nume: string
) {
  if (!utilizatorCurent) {
    return response
      .status(500)
      .json({ mesaj: "Utilizatorul curent nu există" });
  }

  if (utilizatorCurent.rol === "FIRMA") {
    const firmaCurenta: Firma | null = await getFirma(
      utilizatorCurent.id_utilizator
    );
    nume = firmaCurenta ? firmaCurenta.denumire_firma : "";
    raspunsuriPredefinite[2].reply =
      "Ca persoană juridică puteți să închiriați orice fel de container în cadrul platformei (reciclare 🌱, depozitare 🪑, materiale de construcții 👷🏻)";
    if (firmaCurenta.status_aprobare) {
      raspunsuriPredefinite[3].reply = `Ca și firmă aprobată puteți să adăugați un nou container accesând pagina de adăugare container`;
    } else {
      raspunsuriPredefinite[3].reply =
        "Din păcate contul dvs. de firmă nu a fost aprobat de către un administrator. Prin urmare nu puteți să adăugați containerele în cadrul platformei. De obicei, aprobarea poate dura între 24-48 de ore. Din păcate eu nu îți pot aproba contul 😟, vă recomand să luați legătura cu un administrator! 😊";
    }
  } else {
    const persoanaCurenta: Persoana_fizica | null = await getPersoanaFizica(
      utilizatorCurent.id_utilizator
    );
    nume = persoanaCurenta ? persoanaCurenta.prenume : "";
    raspunsuriPredefinite[2].reply =
      "Ca persoană fizică puteți să închiriați containere de depozitare 🪑 și containere de reciclare a materialelor de construcții 👷🏻)";
    raspunsuriPredefinite[3].reply =
      "În cadrul platformei No Waste and Recycle doar persoanele juridice pot adăuga containere, ca și persoană fizică nu aveți acces la această funcționalitate.";
  }
}

export default router;
