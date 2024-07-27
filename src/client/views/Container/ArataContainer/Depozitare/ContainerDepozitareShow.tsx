import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { ContainerInchiriere } from "./Interfete.js";
import HartaContainerDepozitare from "./Componente/HartaContainerDepozitare.js";
import FormInchiriereContainer from "../../../../componente/Carduri/ContainerPreturi/FormInchiriereContainer.js";
import { PretContainer } from "../../../../../server/Routes/Container/Interfete.js";
import RatingContainer from "../Componente/RatingContainer.js";
import Recenzie from "../Componente/Recenzii/Componente/Recenzie.js";
import RecenziiContainer from "../Componente/Recenzii/RecenziiContainer.js";

const ContainerDepozitareShow = () => {
  const { id } = useParams();
  const [containerInchiriere, setContainerInchiriere] =
    useState<ContainerInchiriere>();
  const [eroare, setEroare] = useState<boolean>(false);
  const [preturi, setPreturi] = useState<PretContainer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspunsContainer = await fetch(
          process.env.API_BASE + `/api/containere/containerInchiriere/${id}`
        );
        if (!raspunsContainer.ok) {
          throw new Error("Containerul nu a fost trimis de către server");
        }
        const data = await raspunsContainer.json();
        setContainerInchiriere(data);
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
        throw new Error("Nu există o conexiune activă cu server-ul");
      }
    };
    fetchData();
  }, [id]);

  if (eroare) {
    return <Eroare />;
  }

  return containerInchiriere ? (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="w-2/3 bg-[#f8f9fa] flex justify-center p-10">
        <Card className="w-full mb-1" sx={{ padding: 0 }} elevation={0}>
          <div className="flex justify-between">
            <img
              className="w-full h-96 object-cover"
              src="/container3.jpg"
              alt=""
            />
          </div>
          <Divider sx={{ p: 0 }} />
          <CardContent sx={{ padding: "12px" }} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold hover:text-gray-700">
                {containerInchiriere.denumire}
              </h1>
              <RatingContainer
                idContainer={containerInchiriere.id_container!}
              />
            </div>
            <div className="flex items-center">
              <Link to={`/profil/${containerInchiriere.firma}`}>
                <h6 className="text-sm font-bold text-gray-500 hover:text-gray-700">
                  {containerInchiriere.denumire_firma}
                </h6>
              </Link>
              {containerInchiriere.status_aprobare && (
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
              {containerInchiriere.descriere}
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
          <CardContent sx={{ padding: 0 }}>
            <div className="flex justify-start gap-5 p-4">
              <h5 className="text-gray-400">{`Str. ${containerInchiriere.strada}, Nr. ${containerInchiriere.numar}`}</h5>
              <h5 className="text-gray-400">
                Capacitate: {containerInchiriere.capacitate}Kg
              </h5>
            </div>
            <Divider />
            {/* <HartaContainerDepozitare container={containerInchiriere} /> */}
            <div className="flex">
              <div className="w-1/2 border-r">
                <p></p>
              </div>
              <div className="w-1/2">
                <FormInchiriereContainer
                  id_container={containerInchiriere.id_container}
                  id_utilizator={containerInchiriere.firma}
                  tip="depozitare"
                  preturi={preturi}
                />
              </div>
            </div>
            <Divider />
          </CardContent>
          <RecenziiContainer idContainer={containerInchiriere.id_container!} />
        </Card>
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default ContainerDepozitareShow;
