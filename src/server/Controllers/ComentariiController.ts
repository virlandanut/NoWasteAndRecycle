import { Request, Response } from "express";
import {
  adaugaComentariu,
  getComentariiAdministrator,
  getComentariiProprietarFirma,
  getComentariiProprietarPersoana,
} from "../Models/ComentariuModel.js";
import { getProprietarTichet } from "../Models/TichetProblemaModel.js";
import { getUtilizatorCuId } from "../Models/UtilizatorModel.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { ComentariuTichet } from "../Routes/Raportare/Interfete.js";
import { formatareData } from "../Utils/Functii/Functii_dataTimp.js";
import {
  ComentariuNou,
  DateComentariuFrontEnd,
} from "../Routes/Comentariu/Interfete.js";

export class ComentariiController {
  async getComentariiTichet(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const comentariiAdministratorPromise = getComentariiAdministrator(id);
    const idProprietarPromise = getProprietarTichet(id);
    const [comentariiAdministrator, idProprietar] = await Promise.all([
      comentariiAdministratorPromise,
      idProprietarPromise,
    ]);

    if (!idProprietar) {
      return response
        .status(404)
        .json({ mesaj: "Proprietarul nu a fost găsit" });
    }

    const proprietar = await getUtilizatorCuId(idProprietar);

    if (!proprietar) {
      throw new ExpressError("Proprietarul nu a putut fi obținut", 500);
    }

    let comentariiProprietar: ComentariuTichet[] = [];

    if (proprietar.rol === "FIRMA") {
      comentariiProprietar = await getComentariiProprietarFirma(
        id,
        idProprietar
      );
    } else {
      comentariiProprietar = await getComentariiProprietarPersoana(
        id,
        idProprietar
      );
    }

    const toateComentariile = [
      ...comentariiAdministrator,
      ...comentariiProprietar,
    ];
    toateComentariile.sort(
      (a: ComentariuTichet, b: ComentariuTichet) =>
        a.data.getTime() - b.data.getTime()
    );

    const comentariiTichet = toateComentariile.map(
      (comentariu: ComentariuTichet) => ({
        ...comentariu,
        data: formatareData(comentariu.data.toISOString()),
      })
    );

    response.status(200).send(comentariiTichet);
  }

  async adaugaComentariuNou(request: Request, response: Response) {
    const { id_raport_problema, mesaj }: DateComentariuFrontEnd = request.body;
    if (request.session.utilizator) {
      const comentariu: ComentariuNou = {
        raport_problema: id_raport_problema,
        utilizator: request.session.utilizator.id_utilizator,
        mesaj: mesaj,
      };
      await adaugaComentariu(comentariu);
      response
        .status(200)
        .json({ mesaj: "Comentariul a fost adăugat cu succes!" });
    } else {
      response
        .status(400)
        .json({ mesaj: "Comentariul nu a putut fi adăugat!" });
    }
  }
}
