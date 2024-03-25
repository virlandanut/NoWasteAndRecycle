import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type ContainerInchiriatProp = {
  props: {
    denumire: string;
    adresa: string;
    capacitate: string;
    firma: string;
    aprobare: boolean;
    tarif: string;
  };
};

import HandshakeIcon from "@mui/icons-material/Handshake";
const ContainerInchiriat = ({ props }: ContainerInchiriatProp) => {
  const isVerified = true;
  return (
    <Card className="w-[350px]">
      <CardMedia
        sx={{ height: 250 }}
        image="/public/container2.jpg"
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
        <h5 className="text-md">
          {props.firma} &nbsp;
          {props.aprobare && (
            <span>
              <HandshakeIcon fontSize="medium" color="success" />
            </span>
          )}
        </h5>
        <h5>
          Tarif: <span className="text-green-600">{props.tarif} Lei/Lună</span>
        </h5>
      </CardContent>
      <CardActions className="mb-2 ml-2">
        <Button size="small" variant="contained" color="success">
          Închiriere
        </Button>
        <Button size="small" variant="outlined" color="success">
          Detalii
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContainerInchiriat;
