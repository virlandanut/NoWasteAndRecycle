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
import RutaFirma from "./componente/Erori/RutaFirma";
import AdaugaContainer from "./pages/AdaugaContainer";
import Layout from "./componente/Containere/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RutaProtejata>
        <Layout>
          <Home />
        </Layout>
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
        <Layout>
          <Navigare />
        </Layout>
      </RutaProtejata>
    ),
  },
  {
    path: "/containere",
    element: (
      <RutaProtejata>
        <Layout>
          <Containere />
        </Layout>
      </RutaProtejata>
    ),
  },
  {
    path: "/containere/adauga",
    element: (
      <RutaProtejata>
        <RutaFirma>
          <Layout>
            <AdaugaContainer />
          </Layout>
        </RutaFirma>
      </RutaProtejata>
    ),
  },
  {
    path: "/containere/:id",
    element: (
      <RutaProtejata>
        <Layout>
          <Container />
        </Layout>
      </RutaProtejata>
    ),
  },
  {
    path: "/profil",
    element: (
      <RutaProtejata>
        <Layout>
          <Profil />
        </Layout>
      </RutaProtejata>
    ),
  },
  {
    path: "/firma",
    element: (
      <RutaProtejata>
        <Layout>
          <Firma />
        </Layout>
      </RutaProtejata>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
