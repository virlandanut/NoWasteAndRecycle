import { useEffect, useState } from "react";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import GppMaybeRoundedIcon from "@mui/icons-material/GppMaybeRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import {
  UtilizatorCurentFirma,
  UtilizatorCurentPersoana,
} from "../Interfete.js";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { Divider } from "@mui/material";

const DescriereUtilizator = () => {
  const [persoana, setPersoana] = useState<UtilizatorCurentPersoana | null>(
    null
  );
  const [firma, setFirma] = useState<UtilizatorCurentFirma | null>(null);

  const getZilePartener = (data_aprobare: string): string => {
    const dataCurenta = new Date();
    const dataAprobare = new Date(data_aprobare);

    const timpMilisecundeCurenta = dataCurenta.getTime();
    const timpMilisecundeAprobare = dataAprobare.getTime();

    const diferenteMilisecunde =
      timpMilisecundeCurenta - timpMilisecundeAprobare;

    const diferentaInZile = Math.ceil(
      diferenteMilisecunde / (1000 * 60 * 60 * 24)
    );

    if (diferentaInZile === 1) {
      return ` (acum o zi)`;
    } else if (diferentaInZile > 1 && diferentaInZile < 20) {
      return ` (acum ${diferentaInZile} zile)`;
    } else {
      return ` (acum ${diferentaInZile} de zile)`;
    }
  };

  useEffect(() => {
    const getUtilizatorCurent = async () => {
      try {
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getUtilizator"
        );
        if (!raspunsUtilizator.ok) {
          console.log("Utilizatorul nu a putut fi obținut de la server!");
        }
        const dateUtilizator = await raspunsUtilizator.json();
        if (dateUtilizator.mesaj === "Firma") {
          setFirma(dateUtilizator);
        } else if (dateUtilizator.mesaj === "Persoana") {
          setPersoana(dateUtilizator);
        }
      } catch (eroare) {
        console.log(
          "Au existat probleme la obținerea utilizatorului: ",
          eroare
        );
      }
    };
    getUtilizatorCurent();
  }, []);
  return (
    <section className="pl-4 pr-4 pt-2 pb-2">
      {persoana && (
        <div className="flex flex-col gap-2">
          {persoana.persoana.rol === "administrator" ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-[#15803d] text-lg">
                  {persoana.persoana.nume} {persoana.persoana.prenume}
                </h2>
                <AdminPanelSettingsRoundedIcon
                  fontSize="medium"
                  color="success"
                />
                <span className="text-md text-gray-500 italic font-semibold">{`<${persoana.persoana.rol}>`}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-gray-600 text-lg">
                  {persoana.persoana.nume} {persoana.persoana.prenume}
                </h2>
                <span className="text-md text-gray-500 italic font-semibold">{`<${persoana.persoana.rol}>`}</span>
              </div>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <EmailRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">{persoana.utilizator.email}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <HomeWorkRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">
              Str. {persoana.utilizator.strada}, {persoana.utilizator.numar},{" "}
              {persoana.utilizator.localitate}, Constanța
            </h2>
          </div>
          <div className="flex gap-2 items-center">
            <PhoneRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">{`+4${persoana.utilizator.telefon}`}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <InsertInvitationRoundedIcon
              className="text-gray-700"
              fontSize="small"
            />
            <h2 className="text-gray-500">
              Membru din{" "}
              {new Date(
                persoana.utilizator.data_inscriere
              ).toLocaleDateString()}
            </h2>
          </div>
        </div>
      )}
      {firma && (
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-xl text-gray-600">
            {firma.firma.denumire_firma}{" "}
          </h1>
          {Boolean(firma.firma.status_aprobare) ? (
            <div className="flex gap-1 items-center">
              <div className="flex gap-2 items-center">
                <VerifiedUserRoundedIcon
                  className="text-gray-700"
                  fontSize="small"
                  color="success"
                />
                <span className="text-green-600 font-bold">
                  Partener aprobat
                </span>
              </div>
              <span className="text-gray-400 text-sm font-semibold">
                {getZilePartener(String(firma.firma.data_aprobare))}
              </span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <GppMaybeRoundedIcon fontSize="small" color="error" />
              <span className="text-red-600 font-bold">Partener neaprobat</span>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <EmailRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">{firma.utilizator.email}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <HomeWorkRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">
              Str. {firma.utilizator.strada}, {firma.utilizator.numar},{" "}
              {firma.utilizator.localitate}, Constanța
            </h2>
          </div>
          <div className="flex gap-2 items-center">
            <PhoneRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">{`+4${firma.utilizator.telefon}`}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <InsertInvitationRoundedIcon
              className="text-gray-700"
              fontSize="small"
            />
            <h2 className="text-gray-500">
              Membru din{" "}
              {new Date(firma.utilizator.data_inscriere).toLocaleDateString()}
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default DescriereUtilizator;
