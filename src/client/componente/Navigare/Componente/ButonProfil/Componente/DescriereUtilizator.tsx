import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import GppMaybeRoundedIcon from "@mui/icons-material/GppMaybeRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import {
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
  ContextFirmaCurenta,
} from "../../../../Erori/RutaProtejata.js";
import { Localitate } from "@prisma/client";
import React from "react";

const DescriereUtilizator = () => {
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const { persoanaCurenta } = React.useContext(ContextPersoanaCurenta);
  const { firmaCurenta } = React.useContext(ContextFirmaCurenta);
  const [localitate, setLocalitate] = React.useState<Localitate | null>(null);

  React.useEffect(() => {
    const getLocalitate = async (id: number) => {
      try {
        const api = process.env.API_GET_LOCALITATI;
        if (!api) {
          console.log("API-ul localităților nu există");
          return;
        }
        const raspuns = await fetch(process.env.API_GET_LOCALITATI + `/${id}`);
        if (!raspuns.ok) {
          console.log("Localitatea nu a putut fi obținută de la server");
        }
        const data = await raspuns.json();
        setLocalitate(data);
      } catch (eroare) {
        console.log("Localitatea nu a putut fi obținută de la server");
      }
    };
    if (utilizatorCurent) {
      getLocalitate(utilizatorCurent.localitate);
    }
  }, [utilizatorCurent]);

  const getZilePartener = (data_aprobare: string): string => {
    const dataCurenta = new Date();
    const dataAprobare = new Date(data_aprobare);

    const timpMilisecundeCurenta = dataCurenta.getTime();
    const timpMilisecundeAprobare = dataAprobare.getTime();

    const diferenteMilisecunde =
      timpMilisecundeCurenta - timpMilisecundeAprobare;

    const diferentaInZile = Math.floor(
      diferenteMilisecunde / (1000 * 60 * 60 * 24)
    );

    if (diferentaInZile === 0) {
      return `(astăzi)`;
    } else if (diferentaInZile === 1) {
      return ` (acum o zi)`;
    } else if (diferentaInZile > 1 && diferentaInZile < 20) {
      return ` (acum ${diferentaInZile} zile)`;
    } else {
      return ` (acum ${diferentaInZile} de zile)`;
    }
  };

  return (
    <section className="pl-4 pr-4 pt-2 pb-2">
      {utilizatorCurent && persoanaCurenta && (
        <div className="flex flex-col gap-2">
          {utilizatorCurent.rol === "ADMINISTRATOR" ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-[#15803d] text-lg">
                  {persoanaCurenta.nume} {persoanaCurenta.prenume}
                </h2>
                <AdminPanelSettingsRoundedIcon
                  fontSize="medium"
                  color="success"
                />
                <span className="text-md text-gray-500 italic font-semibold">{`<${utilizatorCurent.rol}>`}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-gray-600 text-lg">
                  {persoanaCurenta.nume} {persoanaCurenta.prenume}
                </h2>
                <span className="text-md text-gray-500 italic font-semibold">{`<${utilizatorCurent.rol}>`}</span>
              </div>
            </div>
          )}
        </div>
      )}
      {utilizatorCurent && firmaCurenta && (
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-xl text-gray-600">
            {firmaCurenta.denumire_firma}{" "}
          </h1>
          {firmaCurenta.status_aprobare ? (
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
              {firmaCurenta.data_aprobare && (
                <span className="text-gray-400 text-sm font-semibold">
                  {getZilePartener(
                    String(new Date(firmaCurenta.data_aprobare))
                  )}
                </span>
              )}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <GppMaybeRoundedIcon fontSize="small" color="error" />
              <span className="text-red-600 font-bold">Firmă neaprobată</span>
            </div>
          )}
        </div>
      )}
      {utilizatorCurent && (
        <>
          <div className="flex gap-2 items-center">
            <EmailRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">{utilizatorCurent.email}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <HomeWorkRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">
              Str. {utilizatorCurent.strada}, {utilizatorCurent.numar}
              {localitate && <span>, {localitate.denumire_localitate}</span>},
              Constanța
            </h2>
          </div>
          <div className="flex gap-2 items-center">
            <PhoneRoundedIcon className="text-gray-700" fontSize="small" />
            <h2 className="text-gray-500">{`+4${utilizatorCurent.telefon}`}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <InsertInvitationRoundedIcon
              className="text-gray-700"
              fontSize="small"
            />
            <h2 className="text-gray-500">
              Membru din{" "}
              {new Date(utilizatorCurent.data_inscriere)
                .toLocaleDateString()
                .replaceAll("/", ".")}
            </h2>
          </div>
        </>
      )}
    </section>
  );
};

export default DescriereUtilizator;
