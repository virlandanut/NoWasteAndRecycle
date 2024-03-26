import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type PropsButonRedirect = {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  size?: "small" | "large";
  catre: string;
  text: string;
};

export default function ButonRedirect({
  tailwind,
  varianta = "outlined",
  size = "large",
  catre,
  text,
}: PropsButonRedirect) {
  return (
    <Link className={tailwind} to={catre}>
      <Button className="w-full" variant={varianta} color="success" size={size}>
        {text}
      </Button>
    </Link>
  );
}
