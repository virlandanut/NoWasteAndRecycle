import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";

type ContainerInchiriereProps = {
  props: ContainerInchiriere;
};

import HandshakeIcon from "@mui/icons-material/Handshake";
import ButonRedirect from "../Butoane/ButonRedirect.js";
import { ContainerInchiriere } from "../../../../interfaces.js";
const ContainerInchiriat = ({ props }: ContainerInchiriereProps) => {
  return (
    <Card className="w-[350px]">
      <CardMedia
        sx={{ height: 250 }}
        image="/public/container3.jpg"
        title="green iguana"
      />
      <CardContent
        sx={{
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: 0,
        }}>
        <Typography gutterBottom variant="h6" component="div">
          {props.denumire}
        </Typography>
        <h5 className="text-gray-400">{props.adresa}</h5>
        <h5 className="text-gray-400">Capacitate: {props.capacitate}kg</h5>
        <h5 className="text-md font-bold">
          {props.firma} &nbsp;
          {props.statusAp === 1 && (
            <Tooltip
              title={
                <h1 className="font-semibold text-base">Partener verificat</h1>
              }
              placement="top">
              <span>
                <HandshakeIcon fontSize="medium" color="success" />
              </span>
            </Tooltip>
          )}
        </h5>
        <h5 className="font-bold">
          Tarif: <span className="text-green-600">{props.tarif} Lei/Lună</span>
        </h5>
      </CardContent>
      <CardActions className="mb-2 ml-2">
        <Button size="small" variant="contained" color="success">
          Închiriere
        </Button>
        <ButonRedirect
          catre={`/containere/${props.idContainer}`}
          text={"Detalii"}
          size="small"
        />
      </CardActions>
    </Card>
  );
};

export default ContainerInchiriat;
