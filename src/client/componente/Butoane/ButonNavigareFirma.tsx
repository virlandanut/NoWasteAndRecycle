import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useBaraNavigareContext } from "../../context/BaraNavigareContext";

interface PropsButonNavigare {
  ruta: string;
  text: string;
  mesajPrompts?: string;
  dezactivat?: boolean;
}

const ButonNavigareFirma = ({
  ruta,
  text,
  mesajPrompts = "Neautorizat",
}: PropsButonNavigare) => {
  const { esteFirma, esteAprobata } = useBaraNavigareContext();

  return (
    esteFirma &&
    esteAprobata && (
      <Link style={{ textDecoration: "none" }} to={ruta}>
        <Button type="button" color="inherit">
          {text}
        </Button>
      </Link>
    )
  );
};

export default ButonNavigareFirma;
