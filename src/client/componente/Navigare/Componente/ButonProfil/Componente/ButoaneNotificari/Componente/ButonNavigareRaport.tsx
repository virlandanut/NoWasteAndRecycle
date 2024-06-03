import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
interface ButonNavigareRaportProps {
  key: React.Key;
  ruta: string;
  text: string;
  status: number;
}

export default function ButonNavigareRaport({
  key,
  ruta,
  text,
  status,
}: ButonNavigareRaportProps) {
  return (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <div className="w-full ">
        {status === 0 ? (
          <InfoRoundedIcon color="error" fontSize="small" />
        ) : (
          <CheckCircleRoundedIcon color="success" fontSize="small" />
        )}
        <Button
          key={key}
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          size="small"
          type="button"
          color="inherit">
          {text}
        </Button>
      </div>
    </Link>
  );
}
