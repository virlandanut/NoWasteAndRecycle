import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import React, { useEffect, useState } from "react";
import ButonLogout from "../../Butoane/ButonLogout";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import ButonRaportare from "../../Butoane/ButonRaportare";
import ButonParola from "../../Butoane/ButonParola";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import { Utilizator } from "../../../../interfaces/Interfete_Utilizator";
import { Persoana } from "../../../../interfaces/Interfete_Persoana";
import { Firma } from "../../../../interfaces/Interfete_Firma";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";

interface UtilizatorCurentPersoana {
  utilizator: Utilizator;
  persoana: Persoana;
  mesaj: string;
}

interface UtilizatorCurentFirma {
  utilizator: Utilizator;
  firma: Firma;
  mesaj: string;
}

const ButonProfil = () => {
  const [elementHTML, setElementHTML] = useState<null | HTMLElement>(null);
  const deschis = Boolean(elementHTML);
  const [persoana, setPersoana] = useState<UtilizatorCurentPersoana | null>(
    null
  );
  const [firma, setFirma] = useState<UtilizatorCurentFirma | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElementHTML(event.currentTarget);
  };

  const handleClose = () => {
    setElementHTML(null);
  };

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
          setLoading(false);
        } else if (dateUtilizator.mesaj === "Persoana") {
          setPersoana(dateUtilizator);
          setLoading(false);
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
    <React.Fragment>
      <Tooltip title="Cont">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={deschis ? "meniu" : undefined}
          aria-haspopup={true}
          aria-expanded={deschis ? "true" : undefined}>
          <Avatar src="/danut.jpg" sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={elementHTML}
        id="meniu"
        open={deschis}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <section className="pl-4 pr-4 pt-2 pb-2">
          {persoana && <div></div>}
          {firma && (
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-xl text-gray-600">
                {firma.firma.denumire_firma}{" "}
              </h1>
              {Boolean(firma.firma.status_aprobare) ? (
                <div className="flex gap-1 items-center">
                  <div className="flex gap-2 items-center">
                    <HandshakeRoundedIcon
                      className="text-gray-700"
                      fontSize="small"
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
                <span className="text-red-700">Partener neaprobat</span>
              )}
              <div className="flex gap-2 items-center">
                <EmailRoundedIcon className="text-gray-700" fontSize="small" />
                <h2 className="text-gray-500">{firma.utilizator.email}</h2>
              </div>
              <div className="flex gap-2 items-center">
                <HomeWorkRoundedIcon
                  className="text-gray-700"
                  fontSize="small"
                />
                <h2 className="text-gray-500">
                  Str. {firma.utilizator.strada}, {firma.utilizator.numar},{" "}
                  {firma.utilizator.localitate}, Constanța
                </h2>
              </div>
              <div className="flex gap-2 items-center">
                <PhoneRoundedIcon className="text-gray-700" fontSize="small" />
                <h2 className="text-gray-500">{firma.utilizator.telefon}</h2>
              </div>
              <div className="flex gap-2 items-center">
                <InsertInvitationRoundedIcon
                  className="text-gray-700"
                  fontSize="small"
                />
                <h2 className="text-gray-500">
                  Membru din{" "}
                  {new Date(
                    firma.utilizator.data_inscriere
                  ).toLocaleDateString()}
                </h2>
              </div>
            </div>
          )}
        </section>
        <Divider />
        <MenuItem onClick={handleClose}>
          <VpnKeyRoundedIcon className="text-gray-700" fontSize="small" />
          <ButonParola />
        </MenuItem>
        <MenuItem>
          <FlagRoundedIcon className="text-gray-700" fontSize="small" />
          <ButonRaportare />
        </MenuItem>
        <MenuItem className="text-gray-700" onClick={handleClose}>
          <LogoutRounded fontSize="small" />
          <ButonLogout />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ButonProfil;
