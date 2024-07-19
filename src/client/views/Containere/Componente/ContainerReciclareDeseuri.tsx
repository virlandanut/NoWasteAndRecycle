import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { ContainerReciclare } from "../../Container/ArataContainer/Reciclare/Interfete.js";
import { Link } from "react-router-dom";
type ContainerReciclareProps = {
  props: ContainerReciclare;
};

const ContainerReciclareDeseuri = ({ props }: ContainerReciclareProps) => {

  return (
    <Link
      className="w-[350px] hover:opacity-90"
      to={`/containere/reciclare/${props.id_container}`}>
      <Card className="w-full bg-[#FCFCFB]">
        <CardMedia sx={{ height: 250 }} image="/container3.jpg" />
        <Divider />
        <CardContent
          className="flex flex-col gap-2"
          sx={{
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
          }}>
          <div className="pl-4 pr-4 pt-2">
            <h1 className="text-xl text-gray-500">{props.denumire}</h1>
          </div>
          <Divider />
          <div className="pr-4 pl-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h5 className="text-gray-400">Postat de:</h5>
                <span className="text-green-700 font-semibold">
                  {props.denumire_firma}
                </span>
                {props.status_aprobare && (
                  <GppGoodIcon fontSize="small" color="success" />
                )}
              </div>
            </div>
            <h5 className="text-gray-400">
              Adresă:{" "}
              <span className="text-gray-500">{`Str. ${props.strada}, Nr. ${props.numar}, ${props.localitate}`}</span>
            </h5>
            <h5 className="text-gray-400">
              Capacitate:{" "}
              <span className="text-gray-500">{props.capacitate}kg</span>
            </h5>
            <h5 className="text-gray-400">
              Deșeu: <span className="text-gray-500">{props.tip}</span>
            </h5>
          </div>
        </CardContent>
      </Card>
    </Link>

  )
};

export default ContainerReciclareDeseuri;
