import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
interface ButonNavigareRaportProps {
  ruta: string;
  text: string;
  status: boolean;
}

export default function ButonNavigareRaport({
  ruta,
  text,
  status,
}: ButonNavigareRaportProps) {
  return (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <div className="w-full ">
        {!status ? (
          <InfoRoundedIcon color="error" fontSize="small" />
        ) : (
          <CheckCircleRoundedIcon color="success" fontSize="small" />
        )}
        <Button
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
