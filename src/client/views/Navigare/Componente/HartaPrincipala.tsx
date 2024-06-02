import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { ContainerInchiriere } from "../../Container/ArataContainer/Depozitare/Interfete.js";
import { ContainerMaterialeConstructii } from "../../Container/ArataContainer/Constructii/Interfete.js";
import { ContainerReciclare } from "../../Container/ArataContainer/Reciclare/Interfete.js";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormHartaPrincipala } from "../Interfete.js";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlybGFuZGFudXQiLCJhIjoiY2x2MmthZG5jMGk5MjJxcnl5dXNpdHJ0NSJ9.YnP4zjo17-zc7tltJDiokA";

interface StateContainere {
  containereInchiriere: ContainerInchiriere[];
  containereReciclare: ContainerReciclare[];
  containereMaterialeConstructii: ContainerMaterialeConstructii[];
}

const HartaPrincipala = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [containere, setContainere] = useState<StateContainere>({
    containereInchiriere: [],
    containereReciclare: [],
    containereMaterialeConstructii: [],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormHartaPrincipala>();

  const initializareHarta = (
    latitude: number,
    longitude: number,
    pozitieUtilizator?: boolean
  ) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [longitude, latitude],
      zoom: 10,
    });

    if (pozitieUtilizator) {
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    }

    const adaugarePOI = (containere: any[], color: string) => {
      containere.forEach((container) => {
        new mapboxgl.Marker({ color: color })
          .setLngLat([container.longitudine, container.latitudine])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h1>Denumire: ${container.denumire}</h1><h2><strong>Capacitate</strong>: ${container.capacitate}Kg</h2> <h2><strong>Adresă</strong>: Str. ${container.strada} Nr. ${container.numar}</h2><h2><strong>Oraș</strong>: ${container.localitate}</h2>`
            )
          )
          .addTo(map);
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

        setContainere(data);
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
        initializareHarta(latitude, longitude, true);
      },
      (eroare) => {
        console.log("Poziția utilizatorului nu a putut fi obținută: ", eroare);
        initializareHarta(44.177269, 28.65288);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
    );
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    initializareHarta(44.177269, 28.65288);
  }, []);
  return (
    <section className="w-full flex gap-5">
      <div className="w-1/2">
        <Button
          onClick={handleGetLocation}
          size="small"
          variant="contained"
          color="success">
          Poziția mea
        </Button>
      </div>
      <div
        className="w-1/2"
        //ref={mapContainer}
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
