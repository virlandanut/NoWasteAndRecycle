import { Raport_problema } from "@prisma/client";
import { Request, Response } from "express";
import {
  adaugaRaportProblema,
  getTichet,
  getTicheteRaport,
  getToateTicheteleFirme,
  getToateTichetelePersoane,
  solutioneazaTichet,
  stergeTichet,
} from "../Models/TichetProblemaModel.js";
import {
  dateTichet,
  Raportare,
  TichetCuNume,
} from "../Routes/Raportare/Interfete.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { stergereComentariiTichet } from "../Models/ComentariuModel.js";
import { getUtilizatorTichet } from "../Models/UtilizatorModel.js";

export async function getRapoarte(request: Request, response: Response) {
  if (!request.session.utilizator) {
    return response
      .status(400)
      .json({ mesaj: "Utilizatorul nu există în sesiune!" });
  }

  const id = request.session.utilizator.id_utilizator;
  const tichete: Raport_problema[] = await getTicheteRaport(id);
  if (tichete.length > 0) {
    return response.status(200).json({ tichete });
  } else {
    return response.status(200).json({ mesaj: "Nu aveți niciun tichet activ" });
  }
}

export async function adaugaRaport(request: Request, response: Response) {
  const { idUtilizator, titlu, mesaj }: Raportare = request.body;
  const raport: Raport_problema = await adaugaRaportProblema(
    idUtilizator,
    titlu,
    mesaj
  );
  if (!raport) {
    throw new ExpressError(
      "Tichetul nu a putut fi adăugat în baza de date",
      500
    );
  }
  return response.status(200).json({
    mesaj: "Tichetul a fost trimis cu succes!",
    id: raport.id_raport_problema,
  });
}

export async function modificaRaport(request: Request, response: Response) {
  const id_tichet = parseInt(request.body.id_tichet);
  await solutioneazaTichet(id_tichet);
  return response
    .status(200)
    .json({ mesaj: "Tichetul a fost soluționat cu succes!" });
}

export async function stergereTichet(request: Request, response: Response) {
  const id_tichet = parseInt(request.body.id_tichet);
  await stergereComentariiTichet(id_tichet);
  await stergeTichet(id_tichet);
  return response
    .status(200)
    .json({ mesaj: "Tichetul a fost șters cu succes!" });
}

export async function getToateRapoarte(request: Request, response: Response) {
  const tichetePersoane: TichetCuNume[] = await getToateTichetelePersoane();
  const ticheteFirme: TichetCuNume[] = await getToateTicheteleFirme();

  return response.status(200).json([...tichetePersoane, ...ticheteFirme]);
}

export async function getRaport(request: Request, response: Response) {
  const id = parseInt(request.params.id);

  const tichet: Raport_problema = await getTichet(id);
  const utilizatorTichet = await getUtilizatorTichet(tichet.utilizator);

  if (!request.session.utilizator || !utilizatorTichet) {
    throw new ExpressError(
      "Nu aveți dreptul să vizualizați această pagină",
      403
    );
  }

  if (
    tichet.utilizator === request.session.utilizator.id_utilizator ||
    request.session.utilizator.rol === "ADMINISTRATOR"
  ) {
    let nume: string;
    if (utilizatorTichet.rol === "FIRMA" && utilizatorTichet.Firma) {
      nume = utilizatorTichet.Firma.denumire_firma;
    } else if (utilizatorTichet.Persoana_fizica) {
      nume = `${utilizatorTichet.Persoana_fizica.nume} ${utilizatorTichet.Persoana_fizica.prenume}`;
    } else {
      nume = "Cont șters";
    }

    const date: dateTichet = {
      tichet: tichet,
      nume: nume,
      rol: utilizatorTichet.rol,
    };

    return response.status(200).send(date);
  } else {
    return response.status(403).json({
      mesaj: "Nu aveți dreptul să vizualizați această pagină!",
    });
  }
}
