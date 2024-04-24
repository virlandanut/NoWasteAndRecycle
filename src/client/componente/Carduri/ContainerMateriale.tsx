import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import ButonRedirect from "../Butoane/ButonRedirect";
import Info from "../Info/Info";
import { ContainerMaterialeConstructii } from "../../../interfaces/Interfete_Container";
import CheckIcon from "@mui/icons-material/Check";

type ContainerMaterialeProps = {
  props: ContainerMaterialeConstructii;
};

const ContainerMateriale = ({ props }: ContainerMaterialeProps) => {
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
        <h5 className="text-gray-400">{`Str. ${props.strada}, Nr. ${props.numar}, ${props.localitate}`}</h5>
        <h5 className="text-gray-400">Capacitate: {props.capacitate}kg</h5>
        <h5 className="text-md font-bold flex">
          <span>{props.denumire_firma}</span>
          {props.status_aprobare === 1 && (
            <Info text="Partener verificat!">
              <CheckIcon fontSize="small" color="success" />
            </Info>
          )}
        </h5>
      </CardContent>
      <CardActions className="mb-2 ml-2">
        <ButonRedirect
          catre={`/containere/constructii/${props.id_container}`}
          text={"Detalii"}
          size="small"
        />
      </CardActions>
    </Card>
  );
};

export default ContainerMateriale;
