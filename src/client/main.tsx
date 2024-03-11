import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InregistrarePersoana from "./pages/InregistrarePersoana/InregistrarePersoana";
import Autentificare from "./pages/Autentificare/Autentificare";
import Eroare from "./pages/Eroare/Eroare";
import Home from "./pages/Acasă/Home";
import Inregistrare from "./pages/Inregistrare/Inregistrare";

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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
