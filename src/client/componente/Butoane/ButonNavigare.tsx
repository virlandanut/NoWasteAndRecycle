import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Info from "../Info/Info";

interface PropsButonNavigare {
  ruta: string;
  text: string;
  dezactivat?: boolean;
}

export default function ButonNavigare({
  ruta,
  text,
  dezactivat = false,
}: PropsButonNavigare) {
  return dezactivat ? (
    <Info
      text="Pentru a putea efectua activități comerciale pe platforma noastră
          trebuie mai întâi să fiți aprobat de către un administrator!">
      <Link style={{ textDecoration: "none" }} to={""}>
        <Button color="inherit" disabled={true}>
          {text}
        </Button>
      </Link>
    </Info>
  ) : (
    <Link style={{ textDecoration: "none" }} to={ruta}>
      <Button color="inherit">{text}</Button>
    </Link>
  );
}
