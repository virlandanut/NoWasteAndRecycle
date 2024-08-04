import { Link, useNavigate, useParams } from "react-router-dom";
import { PretContainer } from "../../../../../server/Routes/Container/Interfete.js";
import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import Loading from "../../../Loading.js";
import Info from "../../../../componente/Info/Info.js";
import CheckIcon from "@mui/icons-material/Check";
import Eroare from "../../../Eroare.js";
import HartaContainerReciclare from "./Componente/HartaContainerReciclare.js";
import { ContainerReciclare } from "./Interfete.js";
import FormInchiriereContainer from "../../../../componente/Carduri/ContainerPreturi/FormInchiriereContainer.js";
import { ButonSchimbareStatus } from "../../../../componente/Butoane/ButonSchimbareStatus.js";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete.js";
import React from "react";
import Notificare from "../../../../componente/Erori/Notificare/Notificare.js";
import { ButonStergereContainer } from "../../../../componente/Butoane/ButonStergereContainer.js";
import { ModificaContainer } from "../Componente/ModificaContainer/ModificaContainer.js";
import { ButonSchimbareDateContainer } from "../Componente/ModificaContainer/Componente/ButonSchimbareDateContainer.js";
import { ContextUtilizatorCurent } from "../../../../componente/Erori/RutaProtejata.js";

const ContainerReciclareShow = () => {
  const { id } = useParams();
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [containerReciclare, setContainerReciclare] =
    React.useState<ContainerReciclare>();
  const [preturi, setPreturi] = React.useState<PretContainer[]>([]);
  const [eroare, setEroare] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const [modificaContainer, setModificaContainer] =
    React.useState<boolean>(false);

  const deschideModificaContainer = () => {
    setModificaContainer(true);
  };

  const inchideModificaContainer = () => {
    setModificaContainer((prev) => !prev);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const raspunsContainer = await fetch(
          process.env.API_BASE + `/api/containere/containerReciclare/${id}`
        );
        if (!raspunsContainer.ok) {
          if (raspunsContainer.status === 404) {
            throw new Error("Containerul nu a fost găsit!");
          }
          throw new Error("Containerul nu a fost trimis de către server");
        }
        const data = await raspunsContainer.json();
        setContainerReciclare(data);
        const raspunsPreturi = await fetch(
          `http://localhost:3000/api/containere/${id}/preturi`
        );
        if (!raspunsPreturi.ok) {
          throw new Error("Preturile nu au fost trimise de către server");
        }
        const dataPreturi = await raspunsPreturi.json();
        setPreturi(dataPreturi);
      } catch (eroare) {
        setEroare(true);
        console.log(
          "Eroare fetch data în componenta ContainerReciclareShow: ",
          eroare
        );
      }
    };
    fetchData();
  }, [id, refresh]);

  if (eroare) {
    return <Eroare />;
  }

  return containerReciclare ? (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="w-1/2 bg-[#f8f9fa] flex justify-center p-10">
        <Card className="w-full mb-1">
          <div className="flex justify-between">
            <img
              className="w-full h-96 object-cover"
              src={containerReciclare.poza ? containerReciclare.poza : ""}
            />
          </div>
          <Divider sx={{ p: 0 }} />
          <CardContent sx={{ padding: "12px" }} className="flex flex-col gap-1">
            <h1 className="text-xl font-bold hover:text-gray-700">
              {containerReciclare.denumire}
            </h1>
            <div className="flex items-center">
              <Link to={`/profil/${containerReciclare.firma}`}>
                <h6 className="text-sm font-bold text-gray-500 hover:text-gray-700">
                  {containerReciclare.denumire_firma}
                </h6>
              </Link>
              {containerReciclare.status_aprobare && (
                <Info text="Partener verificat!">
                  <div className="flex items-center ml-1">
                    <CheckIcon fontSize="small" color="success" />
                  </div>
                </Info>
              )}
            </div>
          </CardContent>
          <Divider />
          <CardContent sx={{ padding: "12px" }}>
            <h3 className="text-base text-gray-400">
              {containerReciclare.descriere}
            </h3>
          </CardContent>
          <Divider />
          <CardContent sx={{ padding: "12px" }}>
            {preturi.map((pret) => (
              <h3 key={pret.denumire_tip_pret}>
                <strong className="text-gray-500">{`${pret.pret}`}</strong>{" "}
                <span className="text-green-600">
                  <strong>RON</strong>
                </span>{" "}
                <span className="text-gray-400">{` / ${pret.denumire_tip_pret}`}</span>
              </h3>
            ))}
            <p className="mt-1 text-xs text-gray-400">
              {" "}
              &#8226; La închirierea unui contrainer se va aplica o taxă în
              valoare de <strong className="text-green-600">4%</strong> din
              prețul total.
            </p>
          </CardContent>
          <Divider />
          <CardContent sx={{ padding: "12px" }}>
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-5">
                <h5 className="text-gray-400">{`Str. ${containerReciclare.strada}, Nr. ${containerReciclare.numar}, ${containerReciclare.localitate}`}</h5>
                <h5 className="text-gray-400">
                  Capacitate: {containerReciclare.capacitate}Kg
                </h5>
              </div>
              {utilizatorCurent &&
                utilizatorCurent.id_utilizator === containerReciclare.firma && (
                  <div className="self-center">
                    <ButonSchimbareDateContainer
                      deschideSchimbareDateContainer={deschideModificaContainer}
                    />
                    <ButonSchimbareStatus
                      id={containerReciclare.id_container}
                      setNotificare={setNotificare}
                    />
                    <ButonStergereContainer
                      id={containerReciclare.id_container}
                      setNotificare={setNotificare}
                      tip="RECICLARE"
                    />
                  </div>
                )}
            </div>
          </CardContent>
          <Divider />
          <HartaContainerReciclare container={containerReciclare} />
          {!containerReciclare.status && (
            <div className="w-full">
              <FormInchiriereContainer
                id_container={containerReciclare.id_container}
                id_utilizator={containerReciclare.firma}
                tip="reciclare"
                preturi={preturi}
              />
            </div>
          )}
        </Card>
      </div>
      <ModificaContainer
        id={containerReciclare.id_container!}
        modificareContainer={modificaContainer}
        inchideModificareContainer={inchideModificaContainer}
        renunta={inchideModificaContainer}
        setNotificare={setNotificare}
        tip="RECICLARE"
        refresh={() => {
          setRefresh((prev) => !prev);
        }}
      />
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </main>
  ) : (
    <Loading />
  );
};

export default ContainerReciclareShow;
