import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
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
          {props.denumire}
        </Typography>
        <h5 className="text-gray-400">{props.adresa}</h5>
        <h5 className="text-gray-400">Capacitate: {props.capacitate}kg</h5>
        <h5 className="text-md font-bold">
          {props.denumire_firma} &nbsp;
          {props.status_aprobare === 1 && (
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
      </CardContent>
      <CardActions className="mb-2 ml-2">
        <ButonRedirect
          catre={`/containere/${props.id_container}`}
          text={"Detalii"}
          size="small"
        />
      </CardActions>
    </Card>
  );
};

export default ContainerInchiriat;