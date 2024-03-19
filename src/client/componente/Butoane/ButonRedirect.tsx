import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PropsButonRedirect } from "../../../../interfaces";

const ButonRedirect: React.FC<PropsButonRedirect> = ({
  tailwind,
  varianta = "outlined",
  catre,
  text,
}) => {
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
};

export default ButonRedirect;
