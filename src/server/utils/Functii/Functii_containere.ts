import moment from "moment";
import {
  Container,
  Coordonate,
} from "../../../interfaces/Interfete_Container.js";
import { FormContainer } from "../../../interfaces/Interfete_Frontend.js";
import { adaugaPret } from "../../BD/SQL_Containere/SQL_Containere.js";

export const creareContainer = (formData: FormContainer): Container => {
  return {
    denumire: formData.denumire,
    capacitate: formData.capacitate,
    strada: formData.strada,
    numar: formData.numar,
    descriere: formData.descriere,
  };
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
    await adaugaPret(
      id_container,
      1,
      preturi.pretZi,
      new Date(moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    );
  }
  if (preturi.pretSaptamana) {
    await adaugaPret(
      id_container,
      2,
      preturi.pretSaptamana,
      new Date(moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    );
  }
  if (preturi.pretLuna) {
    await adaugaPret(
      id_container,
      3,
      preturi.pretLuna,
      new Date(moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    );
  }
  if (preturi.pretAn) {
    await adaugaPret(
      id_container,
      4,
      preturi.pretAn,
      new Date(moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    );
  }
};
