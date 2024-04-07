import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContainerInchiriere } from "../../interfaces/Interfete_Container";
import { Paper, Rating, Tooltip } from "@mui/material";
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
    <main className="flex justify-center items-start max-w-screen max-h-screen">
      <Paper className="flex justify-center items-start w-2/3 mt-5 ml-5">
        <section className="w-1/2 p-3">
          <img className="rounded-lg" src="/container3.jpg" alt="" />
        </section>
        <section className="w-1/2 p-3 pl-0">
          <form className="flex flex-col gap-3" action="">
            <h1 className="text-4xl">{containerInchiriere?.denumire}</h1>
            <div className="flex gap-2">
              <Rating name="read-only" value={3} readOnly />
              <h3 className="text-md text-gray-400">{`(274 recenzii)`}</h3>
            </div>
            <div className="flex gap-1">
              <h2 className="text-xl font-bold text-gray-400 hover:text-gray-500">
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
            <h2>{containerInchiriere?.adresa}</h2>
          </form>
        </section>
      </Paper>
      <Paper className="w-1/3 m-5 h-5/6">
        <h1 className="text-4xl">Comentarii</h1>
      </Paper>
    </main>
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
