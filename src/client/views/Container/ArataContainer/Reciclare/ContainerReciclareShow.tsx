import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PretContainer } from "../../../../../server/Interfete/Interfete_Container.js";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import Loading from "../../../Loading.js";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Info from "../../../../componente/Info/Info.js";
import CheckIcon from "@mui/icons-material/Check";
import Eroare from "../../../Eroare.js";
import ContainerPreturi from "../../../../componente/Carduri/ContainerPreturi/ContainerPreturi.js";
import HartaContainerReciclare from "./Componente/HartaContainerReciclare.js";
import { ContainerReciclare } from "./Interfete.js";

const ContainerReciclareShow = () => {
  const { id } = useParams();
  const [containerReciclare, setContainerReciclare] =
    useState<ContainerReciclare>();
  const [preturi, setPreturi] = useState<PretContainer[]>([]);
  const [eroare, setEroare] = useState<boolean>(false);

  useEffect(() => {
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
  }, [id]);

  if (eroare) {
    return <Eroare />;
  }

  return containerReciclare ? (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="container w-2/3 bg-[#f8f9fa] flex justify-center items-start gap-5 shadow-sm xs:flex-col md:flex-row p-10">
        <Card className="w-1/2 mb-1">
          <CardMedia sx={{ height: 350 }} image="/container3.jpg" />
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
              {containerReciclare.status_aprobare === 1 && (
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
            <div className="flex justify-start gap-5">
              <h5 className="text-gray-400">{`Str. ${containerReciclare.strada}, Nr. ${containerReciclare.numar}, ${containerReciclare.localitate}`}</h5>
              <h5 className="text-gray-400">
                Capacitate: {containerReciclare.capacitate}Kg
              </h5>
            </div>
          </CardContent>
          <Divider />
          <CardActions className="m-2">
            <Button size="small" variant="outlined" color="info">
              <ReviewsIcon />
            </Button>
          </CardActions>
        </Card>
        <div className="w-1/2 h-auto">
          <HartaContainerReciclare container={containerReciclare} />
          <ContainerPreturi
            id_container={containerReciclare.id_container}
            id_utilizator={containerReciclare.firma}
            preturi={preturi}
          />
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default ContainerReciclareShow;
