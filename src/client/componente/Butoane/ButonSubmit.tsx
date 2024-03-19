import { Button } from "@mui/material";
import { PropsButonSubmit } from "../../../../interfaces";

const ButonSubmit: React.FC<PropsButonSubmit> = ({
  tailwind,
  varianta = "contained",
  text,
}) => {
  return (
    <Button
      className={tailwind}
      type="submit"
      variant={varianta}
      color="success"
      size="large">
      {text}
    </Button>
  );
};

export default ButonSubmit;
