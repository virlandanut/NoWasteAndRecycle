import { Link, useParams } from "react-router-dom";
import ContainerBody from "../componente/Containere/ContainerBody";
import { useEffect, useState } from "react";
import { ContainerInchiriere, PretContainer } from "../../../interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import SectiuneMain from "../componente/Containere/Sectiuni/SectiuneMain";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Preturi from "../componente/ComboBox/Preturi";
import Loading from "./Loading";
import SectiuneImagine from "../componente/Containere/Sectiuni/SectiuneImagine";
import SectiunePaper from "../componente/Containere/Sectiuni/SectiunePaper";
import SectiuneForm from "../componente/Containere/Sectiuni/SectiuneForm";
import Header from "../componente/Titluri/Header";
import GppGoodIcon from "@mui/icons-material/GppGood";

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

  return (
    <ContainerBody tailwind="max-w-screen max-h-screen">
      <SectiuneMain tailwind="mt-10 flex justify-center items-center w-full h-full">
        <SectiuneImagine
          tailwind="p-3 w-1/2 h-full"
          tailwindImagine="w-full"
          sursaImagine="/container3.jpg"
        />
        <SectiuneForm tailwind="w-1/2">
          <form className="flex flex-col " action="">
            <SectiuneForm tailwind="flex flex-col gap-3">
              <h1 className="text-4xl">{containerInchiriere?.denumire}</h1>
              <Rating name="read-only" value={3} readOnly />
              <div className="flex gap-1">
                <h2 className="text-xl font-bold text-gray-400">
                  <Link to={`/profil/${containerInchiriere?.id_utilizator}`}>
                    {containerInchiriere?.denumire_firma}
                  </Link>{" "}
                </h2>
                {containerInchiriere?.status_aprobare === 1 && (
                  <Tooltip
                    title={
                      <h1 className="font-semibold text-base">
                        Partener verificat
                      </h1>
                    }
                    placement="top">
                    <span className="self-baseline">
                      <GppGoodIcon fontSize="medium" color="success" />
                    </span>
                  </Tooltip>
                )}
              </div>
            </SectiuneForm>
          </form>
        </SectiuneForm>
      </SectiuneMain>
    </ContainerBody>
  );
};

export default Container;

//  {
//    containerInchiriere ? (
//      <Card className="w-[350px]">
//        <CardMedia sx={{ height: 250 }} image="/container3.jpg" />
//        <Divider />
//        <CardContent
//          sx={{
//            paddingTop: 2,
//            paddingLeft: 2,
//            paddingRight: 2,
//            paddingBottom: 0,
//          }}>
//          <Typography gutterBottom variant="h6" component="div">
//            {containerInchiriere.denumire}
//          </Typography>
//  <h5 className="text-md font-bold">
//    <Link to={`/profil/${containerInchiriere.id_utilizator}`}>
//      {containerInchiriere.denumire_firma}
//    </Link>{" "}
//    &nbsp;
//    {containerInchiriere.status_aprobare === 1 && (
//      <Tooltip
//        title={
//          <h1 className="font-semibold text-base">Partener verificat</h1>
//        }
//        placement="top">
//        <span>
//          <HandshakeIcon fontSize="medium" color="success" />
//        </span>
//      </Tooltip>
//    )}
//   </h5>
//          <h5 className="text-gray-400">{containerInchiriere.adresa}</h5>
//          <h5 className="text-gray-400">
//            Capacitate: {containerInchiriere.capacitate}Kg
//          </h5>
//          <div>{id && <Preturi container={id} />}</div>
//        </CardContent>
//        <CardActions className="mb-2 ml-2">
//          <Button size="small" variant="contained" color="success">
//            Închiriere
//          </Button>
//          <Button size="small" variant="outlined" color="error">
//            Raportare
//          </Button>
//          <Button size="small" variant="outlined" color="info">
//            <ReviewsIcon />
//          </Button>
//        </CardActions>
//      </Card>
//    ) : (
//      <Loading />
//    );
//  }
