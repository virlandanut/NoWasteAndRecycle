import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import InregistrarePersoana from "./pages/Inregistrare/InregistrarePersoana";
import Autentificare from "./pages/Autentificare/Autentificare";
import Eroare from "./pages/Eroare/Eroare";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Autentificare />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Eroare />,
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
