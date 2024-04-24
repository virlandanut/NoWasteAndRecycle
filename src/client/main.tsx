import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InregistrarePersoana from "./pages/Inregistrare/InregistrarePersoana/InregistrarePersoana";
import Autentificare from "./pages/Autentificare";
import Home from "./pages/Home";
import Inregistrare from "./pages/Inregistrare/Inregistrare";
import InregistrareFirma from "./pages/Inregistrare/InregistrareFirma/InregistrareFirma";
import Navigare from "./pages/Navigare";
import Containere from "./pages/Containere";
import RutaProtejata from "./componente/Erori/RutaProtejata";
import Profil from "./pages/Profil";
import Container from "./pages/Container/Depozitare/ContainerDepozitareShow";
import Firma from "./pages/Firma";
import RutaFirma from "./componente/Erori/RutaFirma";
import AdaugaContainer from "./pages/AdaugaContainer";
import Layout from "./componente/Containere/Layout/Layout";
import Eroare from "./pages/Eroare";
import ContainerDepozitareShow from "./pages/Container/Depozitare/ContainerDepozitareShow";
import ContainerReciclareShow from "./pages/Container/Reciclare/ContainerReciclareShow";
import ContainerMaterialeConstructiiShow from "./pages/Container/Constructii/ContainerMaterialeConstructiiShow";

const router = createBrowserRouter([
  {
    element: <RutaProtejata />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/navigare",
            element: <Navigare />,
          },
          {
            path: "/containere",
            element: <Containere />,
          },
          {
            element: <RutaFirma />,
            children: [
              {
                path: "/containere/adauga",
                element: <AdaugaContainer />,
              },
            ],
            errorElement: <Eroare />,
          },
          {
            path: "/containere/depozitare/:id",
            element: <ContainerDepozitareShow />,
          },
          {
            path: "/containere/reciclare/:id",
            element: <ContainerReciclareShow />,
          },
          {
            path: "/containere/constructii/:id",
            element: <ContainerMaterialeConstructiiShow />,
          },
          {
            path: "/profil",
            element: <Profil />,
          },
          {
            path: "/firma",
            element: <Firma />,
          },
        ],
        errorElement: <Eroare />,
      },
    ],
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
