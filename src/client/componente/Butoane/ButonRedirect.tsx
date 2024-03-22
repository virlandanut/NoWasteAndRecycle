import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface PropsButonRedirect {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  catre: string;
  text: string;
}

export default function ButonRedirect({
  tailwind,
  varianta = "outlined",
  catre,
  text,
}: PropsButonRedirect) {
  return (
    <Link className={tailwind} to={catre}>
      <Button
        className="w-full"
        variant={varianta}
        color="success"
        size="large">
        {text}
      </Button>
    </Link>
  );
}
