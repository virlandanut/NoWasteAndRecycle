import { FeatureCollection, LineString } from "geojson";
import mapboxgl from "mapbox-gl";
import { ContainerPartial } from "../../../../../server/Utils/GA/GA";

export const getRuta = async (
  start: [number, number],
  end: [number, number]
) => {
  if (start.length !== 2 || end.length !== 2) {
    return [];
  }

  if (
    start.some((coord) => typeof coord !== "number") ||
    end.some((coord) => typeof coord !== "number")
  ) {
    return [];
  }

  try {
    const raspuns = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}&overview=full`,
      { method: "GET" }
    );
    if (!raspuns.ok) {
      throw new Error("A existat o problemă la obținerea rutei");
    }
    const data = await raspuns.json();
    return data.routes[0].geometry.coordinates;
  } catch (eroare) {
    console.error("Eroare la obținerea datelor de la API-ul de rutare MapBox");
    return [];
  }
};

export const getRutaCoordonateMultiple = async (traseu: ContainerPartial[]) => {
  console.log(traseu);
  if (
    traseu.some((coord) => typeof coord.latitudine !== "number") ||
    traseu.some((coord) => typeof coord.longitudine !== "number")
  ) {
    console.log("Nope");
    return [];
  }

  let coordonate: string = "";
  traseu.map((container, index) => {
    if (index === traseu.length - 1) {
      coordonate += `${container.longitudine},${container.latitudine}`;
    } else {
      coordonate += `${container.longitudine},${container.latitudine};`;
    }
  });

  console.log(coordonate);
  try {
    const raspuns = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${coordonate}?geometries=geojson&access_token=${mapboxgl.accessToken}&overview=full`,
      { method: "GET" }
    );
    console.log(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${coordonate}?geometries=geojson&access_token=${mapboxgl.accessToken}&overview=full`
    );
    if (!raspuns.ok) {
      throw new Error("A existat o problemă la obținerea rutei");
    }
    const data = await raspuns.json();
    return data.routes[0].geometry.coordinates;
  } catch (eroare) {
    console.error("Eroare la obținerea datelor de la API-ul de rutare MapBox");
    return [];
  }
};

export const adaugaRutaPeHarta = (
  coordonate: number[][],
  map: mapboxgl.Map
) => {
  if (!map || !coordonate) return;

  const geojson: FeatureCollection<LineString> = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordonate.map((coord) => [coord[0], coord[1]]),
        },
        properties: {},
      },
    ],
  };
  if (map.getSource("route")) {
    (map.getSource("route") as mapboxgl.GeoJSONSource).setData(geojson);
  } else {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#ff7e5f",
        "line-width": 3,
      },
    });
  }
};

export const stergeRutaPeHarta = (map: mapboxgl.Map) => {
  if (!map) return;
  if (map.getLayer("route")) {
    map.removeLayer("route");
  }
  if (map.getSource("route")) {
    map.removeSource("route");
  }
};
