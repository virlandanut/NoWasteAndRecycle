import { Link, useParams } from "react-router-dom";
import ContainerBody from "../componente/Containere/ContainerBody";
import { useEffect, useState } from "react";
import { ContainerInchiriere } from "../../../interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import SectiuneMain from "../componente/Containere/Sectiuni/SectiuneMain";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ReviewsIcon from "@mui/icons-material/Reviews";

const Container = () => {
  const { id } = useParams<{ id: string }>();
  const [containerInchiriere, setContainerInchiriere] =
    useState<ContainerInchiriere>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + `/api/containere/${id}`
        );
        if (!raspuns.ok) {
          throw new Error("Containerul nu a fost trimis de către server");
        }
        const data = await raspuns.json();
        setContainerInchiriere(data);
      } catch (eroare) {
        throw new Error("Nu există o conexiune activă cu server-ul");
      }
    };
    fetchData();
  }, [id]);

  return (
    <ContainerBody>
      <SectiuneMain tailwind="mt-10">
        {containerInchiriere ? (
          <Card className="w-[350px]">
            <CardMedia sx={{ height: 250 }} image="/public/container3.jpg" />
            <Divider />
            <CardContent
              sx={{
                paddingTop: 2,
                paddingLeft: 2,
                paddingRight: 2,
                paddingBottom: 0,
              }}>
              <Typography gutterBottom variant="h6" component="div">
                {containerInchiriere.denumire}
              </Typography>
              <h5 className="text-md font-bold">
                <Link to={`/profil/${containerInchiriere.id_utilizator}`}>
                  {containerInchiriere.denumire_firma}
                </Link>{" "}
                &nbsp;
                {containerInchiriere.status_aprobare === 1 && (
                  <Tooltip
                    title={
                      <h1 className="font-semibold text-base">
                        Partener verificat
                      </h1>
                    }
                    placement="top">
                    <span>
                      <HandshakeIcon fontSize="medium" color="success" />
                    </span>
                  </Tooltip>
                )}
              </h5>
              <h5 className="text-gray-400">{containerInchiriere.adresa}</h5>
              <h5 className="text-gray-400">
                Capacitate: {containerInchiriere.capacitate}kg
              </h5>
              {/* <h5 className="font-bold">
                <span className="text-green-600">
                  {containerInchiriere.tarif} Lei/Lună
                </span>
              </h5> */}
            </CardContent>
            <CardActions className="mb-2 ml-2">
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
        ) : (
          <LinearProgress color="success" />
        )}
      </SectiuneMain>
    </ContainerBody>
  );
};

export default Container;
