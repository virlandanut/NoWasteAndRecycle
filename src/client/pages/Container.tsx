import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContainerInchiriere } from "../../interfaces/Interfete_Container";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Loading from "./Loading";
import Preturi from "../componente/ComboBox/Preturi";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Info from "../componente/Info/Info";
import CheckIcon from "@mui/icons-material/Check";

const Container = () => {
  const { id } = useParams();
  const [containerInchiriere, setContainerInchiriere] =
    useState<ContainerInchiriere>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspunsContainer = await fetch(
          process.env.API_BASE + `/api/containere/${id}`
        );
        if (!raspunsContainer.ok) {
          throw new Error("Containerul nu a fost trimis de către server");
        }
        const data = await raspunsContainer.json();
        setContainerInchiriere(data);
      } catch (eroare) {
        throw new Error("Nu există o conexiune activă cu server-ul");
      }
    };
    fetchData();
  }, [id]);

  return containerInchiriere ? (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="container w-4/5 bg-[#f8f9fa] flex justify-start items-start gap-12 shadow-sm xs:flex-col md:flex-row p-10">
        <Card className="w-[500px]">
          <CardMedia sx={{ height: 350 }} image="/container3.jpg" />
          <Divider sx={{ p: 0 }} />
          <CardContent sx={{ padding: "12px" }} className="flex flex-col gap-1">
            <h1 className="text-xl font-bold hover:text-gray-700">
              {containerInchiriere.denumire}
            </h1>
            <div className="flex items-center">
              <Link to={`/profil/${containerInchiriere.id_utilizator}`}>
                <h6 className="text-sm font-bold text-gray-500 hover:text-gray-700">
                  {containerInchiriere.denumire_firma}
                </h6>
              </Link>
              {containerInchiriere.status_aprobare === 1 && (
                <Info text="Partener verificat!" width="180px">
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

            {/* <div>{id && <Preturi container={id} />}</div> */}
          </CardContent>
          <Divider />
          <CardContent sx={{ padding: "12px" }}>
            <div className="flex justify-start gap-5">
              <h5 className="text-gray-400">{containerInchiriere.adresa}</h5>
              <h5 className="text-gray-400">
                Capacitate: {containerInchiriere.capacitate}Kg
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
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default Container;

//  {
//    containerInchiriere ? (

//    ) : (
//      <Loading />
//    );
//  }
