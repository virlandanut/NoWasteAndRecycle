import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UtilizatorCurent } from "../../views/Raportare/ArataRaport/Interfete";

const RutaAdministrator = () => {
  const navigate = useNavigate();
  const [utilizatorCurent, setUtilizatorCurent] =
    useState<UtilizatorCurent | null>(null);

  useEffect(() => {
    const getUtilizatorCurent = async () => {
      try {
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getIdRolUtilizatorCurent"
        );
        if (!raspunsUtilizator.ok) {
          console.log("Utilizatorul curent nu a putut fi obținut de la server");
        }
        const dateUtilizator: UtilizatorCurent = await raspunsUtilizator.json();
        setUtilizatorCurent(dateUtilizator);
      } catch (eroare) {
        console.log(
          "Eroare fetch data în componenta RutaAdministrator: ",
          eroare
        );
      }
    };
    getUtilizatorCurent();
  }, [navigate]);

  if (utilizatorCurent !== null && utilizatorCurent.rol === "administrator") {
    return <Outlet />;
  }
};

export default RutaAdministrator;
