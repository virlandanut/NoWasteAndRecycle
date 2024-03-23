import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ButonLogout() {
  const navigate = useNavigate();
  const deconectareUtilizator = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/utilizatori/logout",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) {
        throw new Error("Utilizatorul nu a putut fi deconectat");
      }
      navigate("/login", { replace: true });
    } catch (eroare) {
      console.log("Logout error: ", eroare);
    }
  };
  return (
    <Button color="inherit" onClick={deconectareUtilizator}>
      Logout
    </Button>
  );
}
