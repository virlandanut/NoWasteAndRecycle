import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  validareDenumireContainer,
  validareSDDenumireContainer,
} from "../../Validari/Container/CRUD/Read.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import {
  Container,
  Container_inchiriere_depozitare,
  Container_inchiriere_reciclare,
  Utilizator,
} from "@prisma/client";
import prisma from "../../../Prisma/client.js";

export const verificareProprietarSauAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;
    const container: Container | null = await prisma.container.findUnique({
      where: { id_container: id },
    });

    const utilizatorCurent: Utilizator | null = request.session.utilizator;

    if (!container) {
      return response.status(404).json({
        mesaj: "Containerul pe care încercați să-l ștergeți nu există",
      });
    }

    if (!utilizatorCurent) {
      return response.status(404).json({
        mesaj: "Sesiunea nu există, vă rugăm să vă autentificați",
      });
    }

    if (
      container.firma === utilizatorCurent.id_utilizator ||
      utilizatorCurent.rol === "ADMINISTRATOR"
    ) {
      next();
    } else {
      return response.status(403).json({
        mesaj: "Nu aveți dreptul să ștergeți acest container",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const verificareEligibilitateStergere = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id, tip } = request.body;
    const dataActuala = new Date();
    if (["DEPOZITARE", "MATERIALE"].includes(tip)) {
      const inchirieri: Container_inchiriere_depozitare[] | null =
        await prisma.container_inchiriere_depozitare.findMany({
          where: {
            container: id,
            AND: {
              data_sfarsit: { gte: dataActuala },
            },
          },
        });
      if (inchirieri && inchirieri.length > 0) {
        return response.status(409).json({
          mesaj:
            "Containerul nu poate fi șters deoarece încă este sau va fi închiriat pe viitor",
        });
      }
    } else {
      const inchirieri: Container_inchiriere_reciclare[] | null =
        await prisma.container_inchiriere_reciclare.findMany({
          where: {
            container: id,
            AND: {
              data_sfarsit: { gte: dataActuala },
            },
          },
        });
      if (inchirieri && inchirieri.length > 0) {
        return response.status(409).json({
          mesaj:
            "Containerul nu poate fi șters deoarece încă este sau va fi închiriat pe viitor",
        });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const verificareIntegritatiContainer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const denumireContainer = request.body.data.denumire;
    const verificareDenumireContainer =
      await validareDenumireContainer(denumireContainer);
    if (verificareDenumireContainer) {
      throw new ExpressError("Acest container există deja", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const verificareIntegritatiSDContainer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id, denumire } = request.body.data;
    const verificareDenumireContainer = await validareSDDenumireContainer(
      id,
      denumire
    );
    if (verificareDenumireContainer) {
      throw new ExpressError("Acest container există deja", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validareContainer = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiContainer = Joi.object({
    data: Joi.object({
      denumire: Joi.string().required().min(8).max(20),
      capacitate: Joi.number().min(50).required(),
      tip: Joi.string().valid(
        "Resturi alimentare",
        "Hârtie",
        "Carton",
        "Plastic",
        "Sticlă",
        "Metal",
        "Electronice"
      ),
      strada: Joi.string().required(),
      numar: Joi.string().required(),
      localitate: Joi.string().required(),
      descriere: Joi.string().min(40).required(),
      pretZi: Joi.number().min(100).positive().required(),
      pretSaptamana: Joi.number().min(100).positive(),
      pretLuna: Joi.number().min(100).positive(),
      pretAn: Joi.number().min(100).positive,
      poza: Joi.string().required(),
      codPostal: Joi.string()
        .required()
        .pattern(/^90[0-7]\d{3}$/),
    })
      .custom((value, helpers) => {
        if (value.pretLuna !== undefined && value.pretSaptamana === undefined) {
          return helpers.error("any.custom", {
            message:
              "pretSaptamana trebuie sa fie prezent daca pretLuna este prezent",
          });
        }

        if (value.pretAn !== undefined && value.pretLuna === undefined) {
          return helpers.error("any.custom", {
            message: "pretLuna trebuie sa fie prezent daca pretAn este prezent",
          });
        }
      })
      .required(),
  });

  const { error } = schemaJoiContainer.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};

export const validareSDContainer = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiSDContainer = Joi.object({
    data: Joi.object({
      id: Joi.number().required(),
      denumire: Joi.string().required().min(8).max(20),
      descriere: Joi.string().min(40).required(),
      tip: Joi.string().valid("RECICLARE", "DEPOZITARE", "MATERIALE"),
      poza: Joi.string(),
      pretZi: Joi.number().min(100).positive().required(),
      pretSaptamana: Joi.number().min(100).positive(),
      pretLuna: Joi.number().min(100).positive(),
      pretAn: Joi.number().min(100).positive(),
    })
      .custom((value, helpers) => {
        if (value.pretLuna !== undefined && value.pretSaptamana === undefined) {
          return helpers.error("any.custom", {
            message:
              "pretSaptamana trebuie sa fie prezent daca pretLuna este prezent",
          });
        }

        if (value.pretAn !== undefined && value.pretLuna === undefined) {
          return helpers.error("any.custom", {
            message: "pretLuna trebuie sa fie prezent daca pretAn este prezent",
          });
        }
      })
      .required(),
  });
  const { error } = schemaJoiSDContainer.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
