import { Coordonate } from "../../Routes/Container/Interfete.js";
import { adaugaPret } from "../../Routes/Container/CRUD/Create.js";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

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

export const adaugaPreturi = async (id_container: number, preturi: any) => {
  if (preturi.pretZi) {
    await adaugaPret(id_container, 1, preturi.pretZi);
  }
  if (preturi.pretSaptamana) {
    await adaugaPret(id_container, 2, preturi.pretSaptamana);
  }
  if (preturi.pretLuna) {
    await adaugaPret(id_container, 3, preturi.pretLuna);
  }
  if (preturi.pretAn) {
    await adaugaPret(id_container, 4, preturi.pretAn);
  }
};

// function getDistanta(
//   latitudine1: number,
//   longitudine1: number,
//   latitudine2: number,
//   longitudine2: number
// ) {
//   const R = 6371e3;
//   const
// }
