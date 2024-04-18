import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";

import ButonRedirect from "../Butoane/ButonRedirect.js";
import { ContainerInchiriere } from "../../../interfaces/Interfete_Container.js";
import Info from "../Info/Info.js";

type ContainerInchiriereProps = {
  props: ContainerInchiriere;
};

const ContainerInchiriat = ({ props }: ContainerInchiriereProps) => {
  return (
    <Card className="w-[350px] bg-[#FCFCFB]">
      <CardMedia sx={{ height: 250 }} image="/container3.jpg" />
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
        <h5 className="text-gray-400">{`Str. ${props.strada}, Nr. ${props.numar}`}</h5>
        <h5 className="text-gray-400">Capacitate: {props.capacitate}kg</h5>
        <h5 className="text-md font-bold flex">
          <span>{props.denumire_firma}</span>
          {props.status_aprobare === 1 && (
            <Info text="Partener verificat!" width="360px">
              <GppGoodIcon fontSize="small" color="success" />
            </Info>
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
