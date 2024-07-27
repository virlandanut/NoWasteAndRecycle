import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import Loading from "../../../Loading.js";
import Info from "../../../../componente/Info/Info.js";
import CheckIcon from "@mui/icons-material/Check";
import Eroare from "../../../Eroare.js";
import HartaContainerConstructii from "./Componente/HartaContainerConstructii.js";
import { ContainerMaterialeConstructii } from "./Interfete.js";
import FormInchiriereContainer from "../../../../componente/Carduri/ContainerPreturi/FormInchiriereContainer.js";
import { PretContainer } from "../../../../../server/Routes/Container/Interfete.js";
import RatingContainer from "../Componente/RatingContainer.js";

const ContainerMaterialeConstructiiShow = () => {
  const { id } = useParams();
  const [containerMaterialeConstructii, setContainerMaterialeConstructii] =
    useState<ContainerMaterialeConstructii>();
  const [preturi, setPreturi] = useState<PretContainer[]>([]);
  const [eroare, setEroare] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspunsContainer = await fetch(
          process.env.API_BASE +
            `/api/containere/containerMaterialeConstructii/${id}`
        );
        if (!raspunsContainer.ok) {
          throw new Error("Containerul nu a fost trimis de către server");
        }
        const data = await raspunsContainer.json();
        setContainerMaterialeConstructii(data);
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

  return containerMaterialeConstructii ? (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="w-2/3 bg-[#f8f9fa] flex justify-center items-start gap-5 shadow-sm xs:flex-col xs:w-3/4 sm:flex-col sm:w-3/4 md:flex-col md:w-3/4 lg:flex-row lg:w-2/3 p-10">
        <Card className="w-full mb-1">
          <CardMedia sx={{ height: 350 }} image="/container3.jpg" />
          <Divider sx={{ p: 0 }} />
          <CardContent sx={{ padding: "12px" }} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold hover:text-gray-700">
                {containerMaterialeConstructii.denumire}
              </h1>
              <RatingContainer
                idContainer={containerMaterialeConstructii.id_container!}
              />
            </div>
            <div className="flex items-center">
              <Link to={`/profil/${containerMaterialeConstructii.firma}`}>
                <h6 className="text-sm font-bold text-gray-500 hover:text-gray-700">
                  {containerMaterialeConstructii.denumire_firma}
                </h6>
              </Link>
              {containerMaterialeConstructii.status_aprobare && (
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
              {containerMaterialeConstructii.descriere}
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
              <h5 className="text-gray-400">{`Str. ${containerMaterialeConstructii.strada}, Nr. ${containerMaterialeConstructii.numar}`}</h5>
              <h5 className="text-gray-400">
                Capacitate: {containerMaterialeConstructii.capacitate}Kg
              </h5>
            </div>
          </CardContent>
          <Divider />
        </Card>
        <div className="w-full h-auto">
          <HartaContainerConstructii
            container={containerMaterialeConstructii}
          />
          <FormInchiriereContainer
            id_container={containerMaterialeConstructii.id_container}
            id_utilizator={containerMaterialeConstructii.firma}
            tip="materiale"
            preturi={preturi}
          />
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default ContainerMaterialeConstructiiShow;
