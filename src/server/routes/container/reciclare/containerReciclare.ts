import express, { Router, Request, Response } from "express";
import {
  adaugaPreturi,
  calculareDistanta,
  getAllDatesInRange,
  getCoordonate,
} from "../../../Utils/Functii/Functii_containere.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import {
  ContainerNou,
  ContainerReciclareFrontEnd,
  Coordonate,
  Tip,
} from "../Interfete.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import { verificareFirma } from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import { adaugaContainer } from "../CRUD/Create.js";
import { getIdContainer, getPreturiContainer } from "../CRUD/Read.js";
import {
  getContainerReciclare,
  getContainereReciclare,
  getContainereReciclareFiltrate,
  getContractInchiriereReciclare,
  getInchirieriContainerReciclare,
} from "./CRUD/Read.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";
import {
  Container,
  Container_inchiriere_reciclare,
  Contract_reciclare,
  Firma,
  Localitate,
} from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";
import { DateSelectieContainerReciclare } from "./Interfete.js";
import prisma from "../../../Prisma/client.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import calculeazaPretTotal from "../../Plata/Functii.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const containereReciclare = await getContainereReciclare();
    response.send({
      containereReciclare,
    });
  })
);

router.post(
  "/filtrare",
  catchAsync(async (request: Request, response: Response) => {
    console.log(request.body);
    const {
      capacitate,
      tip,
      coordonate,
      data_inceput,
      data_sfarsit,
      buget,
      bugetPrioritar,
    }: DateSelectieContainerReciclare = request.body;

    const latitudineUtilizator = coordonate.latitudine;
    const longitudineUtilizator = coordonate.longitudine;

    const tipDeseu: { id_tip: number } | null =
      await prisma.tip_deseu.findUnique({
        where: { denumire_tip: tip },
        select: { id_tip: true },
      });

    if (!tipDeseu) {
      throw new ExpressError(`Tipul de deșeu ${tip} nu a fost găsit`, 404);
    }

    const where: { [key: string]: any } = {
      Tip_container: {
        some: {
          tip_deseu: tipDeseu.id_tip,
        },
      },
    };

    const containereExistente = await prisma.container.findMany({
      where: where,
    });

    if (containereExistente.length === 0) {
      return response.status(500).json({
        mesaj: `Nu există niciun container de reciclare pentru ${tip.toLowerCase()}`,
      });
    }

    if (capacitate && capacitate !== "neselectat") {
      where["capacitate"] = { gte: parseInt(capacitate) };
    }

    const containere = await prisma.container.findMany({
      where: where,
      include: {
        Firma: true,
        Localitate: true,
        Istoric_pret: {
          where: {
            data_sfarsit: null,
          },
          include: {
            Tip_pret: true,
          },
        },
      },
    });

    if (!containere || containere.length === 0) {
      return response.status(500).json({
        mesaj: `Nu există container cu capacitate minimă de ${capacitate} kg`,
      });
    }

    if (
      (!data_inceput || data_inceput === "neselectat") &&
      (!data_sfarsit || data_sfarsit === "neselectat") &&
      (!buget || buget === "neselectat")
    ) {
      const containereCuDistante = containere.map((container) => ({
        container,
        distanta: calculareDistanta(
          latitudineUtilizator,
          longitudineUtilizator,
          container.lat,
          container.long
        ),
      }));

      const celMaiApropiatContainer = containereCuDistante.reduce(
        (predecesor, curent) => {
          return predecesor.distanta < curent.distanta ? predecesor : curent;
        }
      );

      console.log({
        container: celMaiApropiatContainer.container,
        distanta: celMaiApropiatContainer.distanta,
        tip: "reciclare",
      });

      return response.status(200).json({
        container: celMaiApropiatContainer.container,
        distanta: celMaiApropiatContainer.distanta,
        tip: "reciclare",
        pret: 0,
        dataInceput: "",
        dataSfarsit: "",
      });
    } else {
      const containereDisponibile = [];
      for (const container of containere) {
        const inchiriereSuprapuse =
          await prisma.container_inchiriere_reciclare.findMany({
            where: {
              container: container.id_container,
              AND: [
                {
                  data_inceput: {
                    lte: new Date(data_sfarsit),
                  },
                },
                {
                  data_sfarsit: {
                    gte: new Date(data_inceput),
                  },
                },
              ],
            },
          });
        if (inchiriereSuprapuse.length === 0) {
          containereDisponibile.push(container);
        }
      }

      if (containereDisponibile.length === 0) {
        return response.status(500).json({
          mesaj: "Nu există niciun container disponibil în perioada menționată",
        });
      }

      const containereSelectateBuget = [];

      for (const container of containereDisponibile) {
        const pret = calculeazaPretTotal({
          dataInceput: new Date(data_inceput),
          dataSfarsit: new Date(data_sfarsit),
          preturi: container.Istoric_pret,
        });
        if (pret.pretFinal <= parseInt(buget)) {
          containereSelectateBuget.push({
            container,
            pretFinal: pret.pretFinal,
          });
        }
      }

      if (containereSelectateBuget.length === 0) {
        return response.status(500).json({
          mesaj: "Nu există niciun container disponibil în bugetul alocat",
        });
      }

      if (bugetPrioritar) {
        const celMaiIeftinContainer = containereSelectateBuget.reduce(
          (predecesor, curent) => {
            return predecesor.pretFinal < curent.pretFinal
              ? predecesor
              : curent;
          }
        );

        console.log({
          container: celMaiIeftinContainer.container,
          distanta: calculareDistanta(
            latitudineUtilizator,
            longitudineUtilizator,
            celMaiIeftinContainer.container.lat,
            celMaiIeftinContainer.container.long
          ),
          tip: "reciclare",
          pret: celMaiIeftinContainer.pretFinal,
          dataInceput: data_inceput,
          dataSfarsit: data_sfarsit,
        });

        return response.status(200).json({
          container: celMaiIeftinContainer.container,
          distanta: calculareDistanta(
            latitudineUtilizator,
            longitudineUtilizator,
            celMaiIeftinContainer.container.lat,
            celMaiIeftinContainer.container.long
          ),
          tip: "reciclare",
          pret: celMaiIeftinContainer.pretFinal,
          dataInceput: data_inceput,
          dataSfarsit: data_sfarsit,
        });
      }
      const containereCuDistante = containereSelectateBuget.map(
        (container) => ({
          container: container.container,
          pret: container.pretFinal,
          distanta: calculareDistanta(
            latitudineUtilizator,
            longitudineUtilizator,
            container.container.lat,
            container.container.long
          ),
        })
      );

      const celMaiApropiatContainer = containereCuDistante.reduce(
        (predecesor, curent) => {
          return predecesor.distanta < curent.distanta ? predecesor : curent;
        }
      );

      return response.status(200).json({
        container: celMaiApropiatContainer.container,
        distanta: celMaiApropiatContainer.distanta,
        tip: "reciclare",
        pret: celMaiApropiatContainer.pret,
        dataInceput: data_inceput,
        dataSfarsit: data_sfarsit,
      });
    }
  })
);

router.post(
  "/",
  verificareFirma,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) => {
    const {
      denumire,
      capacitate,
      tip,
      strada,
      numar,
      localitate,
      descriere,
    }: ContainerReciclareFrontEnd = request.body.data;
    const utilizator = request.session.utilizator;
    if (!utilizator) {
      return response.status(409).json({ mesaj: "Neautorizat!" });
    }
    const coordonate: Coordonate = await getCoordonate(
      `${numar} ${strada}, ${localitate}, România`
    );

    const idLocalitate = await getIdLocalitate(localitate);

    const container: ContainerNou = {
      denumire: denumire,
      capacitate: parseInt(capacitate),
      strada: strada,
      numar: numar,
      descriere: descriere,
      firma: utilizator.id_utilizator,
      localitate: idLocalitate,
      lat: coordonate.latitudine,
      long: coordonate.longitudine,
    };

    await adaugaContainer(container, Tip.RECICLARE, tip);
    const id_container: number = await getIdContainer(container.denumire);

    await adaugaPreturi(id_container, request.body.data);

    return response.status(200).json({
      id_container: id_container,
      mesaj: "Container închiriere adaugat cu success!",
    });
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const container = await getContainerReciclare(id);
    if (container) {
      return response.send(container);
    }
    return response
      .status(404)
      .json({ mesaj: "Container-ul de depozitare nu a fost găsit!" });
  })
);

router.get(
  "/:id/inchirieri",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const containereReciclare: Container_inchiriere_reciclare[] =
      await getInchirieriContainerReciclare(id);

    const toateDateleInchiriere: Set<string> = new Set();

    containereReciclare.forEach((container) => {
      const containerDataInceput =
        container.data_inceput.toLocaleDateString("ro-RO");
      const containerDataSfarsit =
        container.data_sfarsit.toLocaleDateString("ro-RO");

      const dataInceput = dayjs.utc(containerDataInceput, "DD.MM.YYYY");
      const dataSfarsit = dayjs.utc(containerDataSfarsit, "DD.MM.YYYY");

      const rangeData = getAllDatesInRange(dataInceput, dataSfarsit);
      rangeData.forEach((data) => toateDateleInchiriere.add(data));
    });

    return response.json(Array.from(toateDateleInchiriere));
  })
);

router.get(
  "/:id/contract",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const contract: Contract_reciclare =
      await getContractInchiriereReciclare(id);

    return response.status(200).json(contract);
  })
);

export default router;
