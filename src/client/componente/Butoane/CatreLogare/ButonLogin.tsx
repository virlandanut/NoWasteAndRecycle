import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonLogin = () => {
  return (
    <Link className="md:w-1/2 xs:w-full" to="/login">
      <Button
        className="w-full"
        variant="outlined"
        color="success"
        size="large">
        Autentificare
      </Button>
    </Link>
  );
};

export default ButtonLogin;