import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContainerMaterialeConstructii } from "../../../../interfaces/Interfete_Container";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import Loading from "../../Loading";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Info from "../../../componente/Info/Info";
import CheckIcon from "@mui/icons-material/Check";
import HartaContainerDepozitare from "../../../componente/Harta/HartaContainerDepozitare";
import Eroare from "../../Eroare";
import HartaContainerConstructii from "../../../componente/Harta/HartaContainerConstructii";
import ContainerPreturi from "../../../componente/Carduri/ContainerPreturi/ContainerPreturi";

const ContainerMaterialeConstructiiShow = () => {
  const { id } = useParams();
  const [containerMaterialeConstructii, setContainerMaterialeConstructii] =
    useState<ContainerMaterialeConstructii>();
  const [eroare, setEroare] = useState<boolean>(false);

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
      <div className="container w-4/5 bg-[#f8f9fa] flex justify-center items-start gap-5 shadow-sm xs:flex-col md:flex-row p-10">
        <Card className="w-[500px] mb-1">
          <CardMedia sx={{ height: 350 }} image="/container3.jpg" />
          <Divider sx={{ p: 0 }} />
          <CardContent sx={{ padding: "12px" }} className="flex flex-col gap-1">
            <h1 className="text-xl font-bold hover:text-gray-700">
              {containerMaterialeConstructii.denumire}
            </h1>
            <div className="flex items-center">
              <Link to={`/profil/${containerMaterialeConstructii.firma}`}>
                <h6 className="text-sm font-bold text-gray-500 hover:text-gray-700">
                  {containerMaterialeConstructii.denumire_firma}
                </h6>
              </Link>
              {containerMaterialeConstructii.status_aprobare === 1 && (
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

            {/* <div>{id && <Preturi container={id} />}</div> */}
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
          <CardActions className="m-2">
            <Button size="small" variant="contained" color="success">
              Închiriere
            </Button>
            <Button size="small" variant="outlined" color="error">
              Raportare
            </Button>
            <Button size="small" variant="outlined" color="info">
              <ReviewsIcon />
            </Button>
          </CardActions>
        </Card>
        <HartaContainerConstructii container={containerMaterialeConstructii} />
        {/* <ContainerPreturi
          id_container={containerMaterialeConstructii.id_container}
          id_utilizator={containerMaterialeConstructii.firma}
          preturi={preturi}
        /> */}
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default ContainerMaterialeConstructiiShow;
