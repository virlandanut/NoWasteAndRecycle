import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InregistrarePersoana from "./pages/Inregistrare/InregistrarePersoana/InregistrarePersoana";
import Autentificare from "./pages/Autentificare";
import Eroare from "./pages/Eroare";
import Home from "./pages/Home";
import Inregistrare from "./pages/Inregistrare/Inregistrare";
import InregistrareFirma from "./pages/Inregistrare/InregistrareFirma/InregistrareFirma";
import Navigare from "./pages/Navigare";
import Containere from "./pages/Containere";
import RutaProtejata from "./componente/Erori/RutaProtejata";
import Profil from "./pages/Profil";
import Container from "./pages/Container";
import Firma from "./pages/Firma";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RutaProtejata>
        <Home />
      </RutaProtejata>
    ),
    errorElement: <Eroare />,
  },
  {
    path: "/login",
    element: <Autentificare />,
  },
  {
    path: "/register",
    element: <Inregistrare />,
  },
  {
    path: "/register/persoana",
    element: <InregistrarePersoana />,
  },
  {
    path: "/register/firma",
    element: <InregistrareFirma />,
  },
  {
    path: "/navigare",
    element: (
      <RutaProtejata>
        <Navigare />
      </RutaProtejata>
    ),
  },
  {
    path: "/containere",
    element: (
      <RutaProtejata>
        <Containere />
      </RutaProtejata>
    ),
  },
  {
    path: "/containere/:id",
    element: (
      <RutaProtejata>
        <Container />
      </RutaProtejata>
    ),
  },
  {
    path: "/profil",
    element: (
      <RutaProtejata>
        <Profil />
      </RutaProtejata>
    ),
  },
  {
    path: "/firma",
    element: (
      <RutaProtejata>
        <Firma />
      </RutaProtejata>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
