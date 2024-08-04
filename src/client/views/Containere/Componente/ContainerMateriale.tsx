import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import { ContainerMaterialeConstructii } from "../../Container/ArataContainer/Constructii/Interfete.js";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Link } from "react-router-dom";

type ContainerMaterialeProps = {
  props: ContainerMaterialeConstructii;
};

const ContainerMateriale = ({ props }: ContainerMaterialeProps) => {
  return (
    <Link
      className="w-96 hover:opacity-90"
      to={`/containere/constructii/${props.id_container}`}>
      <Card className="bg-[#FCFCFB]">
        <CardMedia sx={{ height: 250 }} image={props.poza ? props.poza : ""} />
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContainerMateriale;
