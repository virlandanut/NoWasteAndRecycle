import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { ContainerInchiriere } from "../../Container/ArataContainer/Depozitare/Interfete.js";
import { Link } from "react-router-dom";

type ContainerInchiriereProps = {
  props: ContainerInchiriere;
};

const ContainerDepozitare = ({ props }: ContainerInchiriereProps) => {
  const dataSfarsit: Date | null = props.data_sfarsit;
  const dataCurenta: Date = new Date();
  let inchiriereExpirata: boolean = false;
  if (dataSfarsit && dataSfarsit > dataCurenta) {
    inchiriereExpirata = true;
  }
  console.log(dataSfarsit);
  console.log(dataCurenta);
  console.log(inchiriereExpirata);
  return (!props.data_inceput && !props.data_sfarsit) ?
    (<Link
      className="w-[350px] hover:opacity-90"
      to={`/containere/depozitare/${props.id_container}`}>
      <Card className="bg-[#FCFCFB]">
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
          </div>
        </CardContent>
      </Card>
    </Link>) : (
      <div className="w-[350px]">
        <Card sx={{ backgroundColor: '$fff', color: '$000', filter: 'grayscale(100%)' }} className="bg-[#FCFCFB]">
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
            </div>
            <Divider />
            <h5 className="text-gray-400 text-center font-semibold mt-2">
              {props.data_inceput && props.data_sfarsit ? <span className="text-gray-500">Acest container este închiriat în perioada {new Date(props.data_inceput).toLocaleDateString('ro-RO', { timeZone: 'UTC' }).replaceAll("/", ".")} - {new Date(props.data_sfarsit).toLocaleDateString('ro-RO', { timeZone: 'UTC' }).replaceAll("/", ".")}</span> : <span>Containerul este deja închiriat!</span>}
            </h5>
          </CardContent>
        </Card>
      </div>
    )

};

export default ContainerDepozitare;
