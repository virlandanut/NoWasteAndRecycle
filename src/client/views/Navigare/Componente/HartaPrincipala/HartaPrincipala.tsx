import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { adaugaRutaPeHarta, getRuta } from "./Functii";
import { ICoordonate } from "../../Interfete";
import { Utilizator } from "@prisma/client";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlybGFuZGFudXQiLCJhIjoiY2x2MmthZG5jMGk5MjJxcnl5dXNpdHJ0NSJ9.YnP4zjo17-zc7tltJDiokA";

interface HartaPrincipalaProps {
  coordonate: ICoordonate | null;
  utilizatorCurent: Utilizator | null;
}

const HartaPrincipala = ({
  coordonate,
  utilizatorCurent,
}: HartaPrincipalaProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);
  const [coordonateUtilizator, setCoordonateUtilizator] = React.useState<
    [number, number] | null
  >(null);
  const [coordonateRuta, setCoordonateRuta] = useState<[number, number][]>([]);

  const initializareHarta = (
    latitude: number,
    longitude: number,
    pozitieUtilizator?: boolean
  ) => {
    const newMap = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [longitude, latitude],
      zoom: 10,
    });

    setMap(newMap);

    if (pozitieUtilizator) {
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(newMap);
    }

    const adaugarePOI = (containere: any[], color: string) => {
      containere.forEach((container) => {
        new mapboxgl.Marker({ color: color })
          .setLngLat([container.longitudine, container.latitudine])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              color === "green"
                ? `<h1>Denumire: ${container.denumire}</h1>
              <h2><strong>Capacitate</strong>: ${container.capacitate}Kg</h2> 
              <h2><strong>Adresă</strong>: Str. ${container.strada} Nr. ${container.numar}</h2>
              <h2><strong>Oraș</strong>: ${container.localitate}</h2>
              <h2><strong>Deșeu: </strong>: ${container.tip}</h2>
              ${
                utilizatorCurent && utilizatorCurent.rol === "FIRMA"
                  ? `
                ${container.pretZi ? `<h4><strong>Preț pe zi: </strong>${container.pretZi} RON</h4>` : ""}
                ${container.pretSaptamana ? `<h4><strong>Preț pe săptămână: </strong>${container.pretSaptamana} RON</h4>` : ""}
                ${container.pretLuna ? `<h4><strong>Preț pe lună: </strong>${container.pretLuna} RON</h4>` : ""}
                ${container.pretAn ? `<h4><strong>Preț pe an: </strong>${container.pretAn} RON</h4>` : ""}
                `
                  : ""
              }
              `
                : `<h1>Denumire: ${container.denumire}</h1>
              <h2><strong>Capacitate</strong>: ${container.capacitate}Kg</h2> 
              <h2><strong>Adresă</strong>: Str. ${container.strada} Nr. ${container.numar}</h2>
              <h2><strong>Oraș</strong>: ${container.localitate}</h2>
              ${container.pretZi ? `<h4><strong>Preț pe zi: </strong>${container.pretZi} RON</h4>` : ""}
                ${container.pretSaptamana ? `<h4><strong>Preț pe săptămână: </strong>${container.pretSaptamana} RON</h4>` : ""}
                ${container.pretLuna ? `<h4><strong>Preț pe lună: </strong>${container.pretLuna} RON</h4>` : ""}
                ${container.pretAn ? `<h4><strong>Preț pe an: </strong>${container.pretAn} RON</h4>` : ""}
                `
            )
          )
          .addTo(newMap);
      });
    };

    const getContainere = async () => {
      try {
        let raspuns = await fetch("http://localhost:3000/api/containere");
        if (!raspuns.ok) {
          console.log("Containerele nu au fost trimise de către server");
        }
        const data = await raspuns.json();
        adaugarePOI(data.containereReciclare, "green");
        adaugarePOI(data.containereInchiriere, "yellow");
        adaugarePOI(
          data.containereMaterialeConstructii,
          "rgba(128, 128, 128, 1)"
        );
      } catch (eroare) {
        console.log("Eroare la obținerea datelor de la server: ", eroare);
      }
    };
    getContainere();
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pozitie) => {
        const { latitude, longitude } = pozitie.coords;
        setCoordonateUtilizator([longitude, latitude]);
        initializareHarta(latitude, longitude, true);
      },
      (eroare) => {
        console.log("Poziția utilizatorului nu a putut fi obținută: ", eroare);
        initializareHarta(44.177269, 28.65288);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
    );
  };

  React.useEffect(() => {
    if (map && coordonateRuta.length > 0) {
      adaugaRutaPeHarta(coordonateRuta, map);
    }
  }, [coordonateRuta, map]);

  React.useEffect(() => {
    if (coordonate && coordonateUtilizator) {
      const setRuta = async () => {
        const ruta = await getRuta(coordonateUtilizator, [
          coordonate.longitudine,
          coordonate.latitudine,
        ]);
        setCoordonateRuta(ruta);
      };
      setRuta();
    }
  }, [coordonate, coordonateUtilizator]);

  useEffect(() => {
    if (!mapContainer.current) return;
    handleGetLocation();
  }, []);
  return (
    <section className="w-full flex gap-5">
      <div
        className="w-full"
        ref={mapContainer}
        style={{
          height: "800px",
          borderRadius: "5px",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
        }}
      />
    </section>
  );
};

export default HartaPrincipala;
