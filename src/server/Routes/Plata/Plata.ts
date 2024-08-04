import express, { Router, Request, Response } from "express";
import Stripe from "stripe";
import cors from "cors";
import { ExpressError } from "../../Utils/ExpressError.js";
import prisma from "../../Prisma/client.js";
import calculeazaPretTotal from "./Functii.js";
import { PreturiContainer } from "./Interface.js";
import { creazaContainerInchiriereDepozitare } from "../Container/Inchiriere/CRUD/Create.js";
import { creazaContainerInchiriereReciclareMateriale } from "../Container/MaterialeConstructii/CRUD/Create.js";
import { creazaContainerInchiriereReciclare } from "../Container/Reciclare/CRUD/Create.js";
import dayjs from "dayjs";
import dotenv from "dotenv";
import { catchAsync } from "../../Middlewares/Middlewares.js";

dotenv.config();

const router: Router = express.Router({ mergeParams: true });

router.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  catchAsync(async (request: Request, response: Response) => {
    const sig = request.headers["stripe-signature"]!;
    let event: Stripe.Event;

    const api: string | undefined = process.env.STRIPE_SECRET;
    if (!api) {
      throw new ExpressError("API-ul Stripe nu este valid!", 500);
    }
    event = stripe.webhooks.constructEvent(request.body, sig, api);

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata as { [key: string]: string };
        const {
          id_container,
          id_utilizator,
          data_inceput,
          data_sfarsit,
          tip_container,
          pret_final,
          latitudine,
          longitudine,
        } = metadata;

        const utilizator: number = parseInt(id_utilizator);
        const container: number = parseInt(id_container);
        const dataInceput: dayjs.Dayjs = dayjs(
          data_inceput,
          "MM-DD-YYYY"
        ).startOf("day");
        const dataSfarsit: dayjs.Dayjs = dayjs(
          data_sfarsit,
          "MM-DD-YYYY"
        ).startOf("day");
        const pretFinal: number = parseFloat(pret_final);
        const lat: number = parseFloat(latitudine);
        const long: number = parseFloat(longitudine);

        if (tip_container === "depozitare") {
          await creazaContainerInchiriereDepozitare(
            utilizator,
            container,
            dataInceput.format(),
            dataSfarsit.format(),
            lat,
            long,
            "FIX",
            pretFinal
          );
        } else if (tip_container === "materiale") {
          await creazaContainerInchiriereReciclareMateriale(
            utilizator,
            container,
            dataInceput.format(),
            dataSfarsit.format(),
            "MOBIL",
            pretFinal
          );
        } else {
          await creazaContainerInchiriereReciclare(
            utilizator,
            container,
            dataInceput.format(),
            dataSfarsit.format(),
            lat,
            long,
            pretFinal
          );
        }

        break;
      default:
        console.log(`Procesare plată (${event.type})...`);
    }

    return response.json({ received: true });
  })
);

router.use(express.json());
router.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const secret: string | undefined = process.env.STRIPE_PUBLIC_KEY;
if (!secret) {
  throw new ExpressError("Cheia publică Stripe nu este validă", 500);
}

const stripe = new Stripe(secret);

router.post("/plateste", async (request: Request, response: Response) => {
  const {
    data_inceput,
    data_sfarsit,
    id_utilizator,
    id_container,
    tip_container,
  } = request.body;

  const container = await prisma.container.findUnique({
    where: { id_container },
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

  if (!container) {
    throw new ExpressError("Containerul nu există în baza de date", 500);
  }

  const utilizator = await prisma.utilizator.findUnique({
    where: { id_utilizator },
    include: {
      Localitate: true,
    },
  });

  if (!utilizator) {
    throw new ExpressError("Utilizatorul nu există în baza de date", 500);
  }

  const dataInceput: Date = new Date(data_inceput);
  const dataSfarsit: Date = new Date(data_sfarsit);

  const pret: PreturiContainer = calculeazaPretTotal({
    dataInceput,
    dataSfarsit,
    preturi: container.Istoric_pret,
  });

  const pret_final: number = pret.pretFinal;
  const latitudine: number = container.lat;
  const longitudine: number = container.long;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: utilizator.email,
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: container.denumire,
              description: container.descriere,
            },
            unit_amount: Math.round(pret.pretFinal * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/inchirieri/${utilizator.nume_utilizator}`,
      cancel_url: `http://localhost:3000/containere`,
      metadata: {
        id_container,
        id_utilizator,
        data_inceput,
        data_sfarsit,
        tip_container,
        pret_final,
        latitudine,
        longitudine,
      },
    });

    response.status(200).send({ url: session.url });
  } catch (eroare) {
    response.status(500).send({ error: (eroare as Error).message });
  }
});

export default router;
