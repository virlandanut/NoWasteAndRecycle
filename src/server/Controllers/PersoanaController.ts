import { Request, Response } from "express";
import prisma from "../Prisma/client.js";
import {
  crearePersoana,
  creareUtilizator,
} from "../Utils/Functii/Functii_utilizatori.js";
import { Localitate, Persoana_fizica, Utilizator } from "@prisma/client";
import { DateExistentePersoana } from "../Routes/Utilizator/Persoana/Interfete.js";
import {
  addPersoana,
  getPersoanaFizica,
  updatePersoana,
} from "../Models/PersoanaModel.js";
import { getLocalitateCuDenumire } from "../Models/LocaliltateModel.js";
import {
  addUtilizator,
  getDatePersoana,
  getUtilizatorCuId,
  updateUtilizator,
} from "../Models/UtilizatorModel.js";

export async function getPersoana(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const persoana: Persoana_fizica | null = await getPersoanaFizica(id);
  if (persoana) {
    return response.status(200).json(persoana);
  } else {
    return response.status(404).json({ mesaj: "Această persoană nu există!" });
  }
}

export async function crearePersoanaNoua(request: Request, response: Response) {
  const utilizator = creareUtilizator(request.body);
  const persoana = crearePersoana(request.body);
  const localitate = await getLocalitateCuDenumire(utilizator.localitate);

  if (!localitate) {
    return response
      .status(404)
      .json({ eroare: "Localitatea nu a putut fi găsită!" });
  }

  const utilizatorNou: Utilizator = await addUtilizator(
    utilizator,
    "STANDARD",
    localitate.id_localitate
  );

  const persoanaNoua: Persoana_fizica = await addPersoana(
    utilizatorNou.id_utilizator,
    persoana
  );

  if (persoanaNoua) {
    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  } else {
    response
      .status(500)
      .json({ success: false, message: "Contul nu a putut fi creat!" });
  }
}

export async function modificarePersoana(request: Request, response: Response) {
  const date: DateExistentePersoana = request.body.data;

  if (!request.session.utilizator) {
    return response
      .status(500)
      .json({ mesaj: "Datele contului nu au putut fi actualizate" });
  }

  const utilizator = await getUtilizatorCuId(
    request.session.utilizator.id_utilizator
  );

  if (!utilizator) {
    return response
      .status(404)
      .json({ mesaj: "Utilizatorul nu există în baza de date" });
  }

  const localitate: Localitate | null = await getLocalitateCuDenumire(
    date.localitate
  );

  if (!localitate) {
    return response
      .status(404)
      .json({ mesaj: "Localitatea nu există în baza de date" });
  }

  await prisma.$transaction(async () => {
    const utilizatorActualizat = await updateUtilizator(
      utilizator.id_utilizator,
      {
        email: date.email,
        nume_utilizator: date.nume_utilizator,
        telefon: date.telefon,
        strada: date.strada,
        numar: date.numar,
      },
      localitate.id_localitate
    );
    request.session.utilizator = utilizatorActualizat;
    await updatePersoana(utilizator.id_utilizator, {
      nume: date.nume,
      prenume: date.prenume,
    });
  });

  return response
    .status(200)
    .json({ mesaj: "Datele contului au fost actualizate cu succes!" });
}

export async function getDateCompletePersoana(
  request: Request,
  response: Response
) {
  const id = parseInt(request.params.id);
  if (!id) {
    return response.status(500).json({
      mesaj: "Datele curente ale persoanei nu au putut fi obținute",
    });
  }

  const persoana = await getDatePersoana(id);

  if (persoana) {
    return response.status(200).json(persoana);
  } else {
    return response.status(500).json({
      mesaj: "Datele complete ale persoanei nu au putut fi obținute",
    });
  }
}
