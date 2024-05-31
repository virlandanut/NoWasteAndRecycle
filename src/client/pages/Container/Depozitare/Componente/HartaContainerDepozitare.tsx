import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { ContainerInchiriere } from "../Interfete";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidmlybGFuZGFudXQiLCJhIjoiY2x2MmthZG5jMGk5MjJxcnl5dXNpdHJ0NSJ9.YnP4zjo17-zc7tltJDiokA";

const HartaContainerDepozitare = ({
  container,
}: {
  container: ContainerInchiriere;
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/light-v11",
      center: [container.longitudine, container.latitudine],
      zoom: 15,
    });
    new mapboxgl.Marker({ color: "yellow" })
      .setLngLat([container.longitudine, container.latitudine])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h1>Denumire: ${container.denumire}</h1><h2><strong>Capacitate</strong>: ${container.capacitate}Kg</h2> <h2><strong>Adresă</strong>: Str. ${container.strada} Nr. ${container.numar}</h2><h2><strong>Oraș</strong>: ${container.localitate}</h2>`
        )
      )
      .addTo(map);
  }, [container.longitudine, container.latitudine]);
  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          width: "450px",
          height: "350px",
          borderRadius: "5px",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
};

export default HartaContainerDepozitare;
