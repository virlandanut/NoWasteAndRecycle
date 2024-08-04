import { Coordonate } from "../../Routes/Container/Interfete.js";
import {
  adaugaPret,
  anuleazaPret,
  getPretExistent,
} from "../../Routes/Container/CRUD/Create.js";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import prisma from "../../Prisma/client.js";
import { ExpressError } from "../ExpressError.js";
import cloudinary from "../../Servicii/serviciu-cloudinary.js";
import { Istoric_pret } from "@prisma/client";

dayjs.extend(isSameOrBefore);

export const getAllDatesInRange = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): string[] => {
  const dates: string[] = [];
  if (startDate.isSame(endDate)) {
    dates.push(startDate.toISOString().split("T")[0]);
    return dates;
  } else {
    let currentDate = startDate;
    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate = currentDate.add(1, "day");
    }
    return dates;
  }
};

export const getCoordonate = (adresa: string): Promise<Coordonate> => {
  const tokenAcces =
    "pk.eyJ1IjoidmlybGFuZGFudXQiLCJhIjoiY2x2MmthZG5jMGk5MjJxcnl5dXNpdHJ0NSJ9.YnP4zjo17-zc7tltJDiokA";
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

  return new Promise((resolve, reject) => {
    fetch(
      `${url}${encodeURIComponent(adresa)}.json?country=RO&access_token=${tokenAcces}`
    )
      .then((raspuns) => raspuns.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const coordonate = data.features[0].geometry.coordinates;
          const latitudine = coordonate[1];
          const longitudine = coordonate[0];

          resolve({ latitudine, longitudine });
        } else {
          reject(new Error("Niciun rezultat nu a fost găsit"));
        }
      })
      .catch((eroare) => {
        reject(eroare);
      });
  });
};

export const adaugaPreturi = async (
  id_container: number,
  preturi: any,
  modificare: boolean = false
) => {
  const proceseazaPreturi: Promise<void>[] = [];

  const proceseazaPret = async (tipPret: number, pret: string) => {
    if (modificare) {
      const pret: Istoric_pret | null = await getPretExistent(
        id_container,
        tipPret
      );
      if (pret) {
        await anuleazaPret(pret.id_istoric_pret);
      }
    }
    proceseazaPreturi.push(adaugaPret(id_container, tipPret, pret));
  };
  if (preturi.pretZi) {
    proceseazaPreturi.push(proceseazaPret(1, preturi.pretZi));
  }
  if (preturi.pretSaptamana) {
    proceseazaPreturi.push(proceseazaPret(2, preturi.pretSaptamana));
  }
  if (preturi.pretLuna) {
    proceseazaPreturi.push(proceseazaPret(3, preturi.pretLuna));
  }
  if (preturi.pretAn) {
    proceseazaPreturi.push(proceseazaPret(4, preturi.pretAn));
  }
  await Promise.all(proceseazaPreturi);
};

export const modificareImagine = async (
  id: number,
  poza: string | null,
  tip: string
) => {
  if (poza) {
    const container = await prisma.container.findUnique({
      where: { id_container: id },
    });
    if (!container)
      throw new ExpressError("Containerul nu există în baza de date", 404);

    const pozaVeche: string | null = container.poza;
    if (pozaVeche) {
      const publicId: string | undefined = pozaVeche
        .split("/")
        .pop()
        ?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const tipMap: { [key: string]: string } = {
      RECICLARE: "containerReciclare",
      DEPOZITARE: "containerDepozitare",
      MATERIALE: "containerMateriale",
    };

    const uploadPreset = tipMap[tip];
    if (uploadPreset) {
      const raspunsCloudinary = await cloudinary.uploader.upload(poza, {
        upload_preset: uploadPreset,
      });
      await prisma.container.update({
        where: { id_container: id },
        data: { poza: raspunsCloudinary.url },
      });
    }
  }
};

export const calculareDistanta = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanta = R * c;
  return distanta;
};
