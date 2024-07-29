import { FeatureCollection, LineString } from "geojson";
import mapboxgl from "mapbox-gl";

export const getRuta = async (
  start: [number, number],
  end: [number, number]
) => {
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

export const adaugaRutaPeHarta = (
  coordonate: number[][],
  map: mapboxgl.Map
) => {
  if (!map) return;

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
