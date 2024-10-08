import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InregistrarePersoana from "./views/InregistrareUtilizator/InregistrarePersoana/InregistrarePersoana";
import Autentificare from "./views/Autentificare/Autentificare";
import Home from "./views/Home/Home";
import Inregistrare from "./views/InregistrareUtilizator/Inregistrare";
import InregistrareFirma from "./views/InregistrareUtilizator/InregistrareFirma/InregistrareFirma";
import Navigare from "./views/Navigare/Navigare";
import Containere from "./views/Containere/Containere";
import RutaProtejata from "./componente/Erori/RutaProtejata";
import Profil from "./views/Profil";
import Firma from "./views/Firma";
import AdaugaContainer from "./views/Container/AdaugaContainer/AdaugaContainer";
import Eroare from "./views/Eroare";
import ContainerDepozitareShow from "./views/Container/ArataContainer/Depozitare/ContainerDepozitareShow";
import ContainerReciclareShow from "./views/Container/ArataContainer/Reciclare/ContainerReciclareShow";
import ContainerMaterialeConstructiiShow from "./views/Container/ArataContainer/Constructii/ContainerMaterialeConstructiiShow";
import Layout from "./Layout";
import RaportShow from "./views/Raportare/ArataRaport/RaportShow";
import RutaAdministrator from "./componente/Erori/RutaAdministrator";
import PortalAdministrator from "./views/PortalAdministrator/PortalAdministrator";
import RutaFirma from "./componente/Erori/RutaFirma";
import InchirieriContainere from "./views/Inchirieri/InchirieriContainere";

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
            element: <RutaAdministrator />,
            children: [
              {
                path: "/portal",
                element: <PortalAdministrator />,
              },
            ],
            errorElement: <Eroare />,
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
            path: "/containere/reciclare/:id",
            element: <ContainerReciclareShow />,
          },
          {
            path: "/containere/depozitare/:id",
            element: <ContainerDepozitareShow />,
          },
          {
            path: "/containere/constructii/:id",
            element: <ContainerMaterialeConstructiiShow />,
          },
          {
            path: "/raport/:id",
            element: <RaportShow />,
          },
          {
            path: "/inchirieri/:nume_utilizator",
            element: <InchirieriContainere />
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
