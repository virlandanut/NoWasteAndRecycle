import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InregistrarePersoana from "./pages/Inregistrare/InregistrarePersoana/InregistrarePersoana";
import Autentificare from "./pages/Autentificare/Autentificare";
import Eroare from "./pages/Eroare/Eroare";
import Home from "./pages/Acasă/Home";
import Inregistrare from "./pages/Inregistrare/Inregistrare";
import InregistrareFirma from "./pages/Inregistrare/InregistrareFirma/InregistrareFirma";
import Navigare from "./pages/Navigare/Navigare";
import Containere from "./pages/Containere/Containere";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <Navigare />
  },
  {
    path: "/containere",
    element: <Containere />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
