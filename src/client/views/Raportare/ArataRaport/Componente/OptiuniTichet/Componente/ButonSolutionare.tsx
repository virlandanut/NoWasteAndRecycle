import { Button, Snackbar, SnackbarContent } from "@mui/material";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import { ButonSolutionareProps } from "./Interfete";

const ButonSolutionare = ({
  id_tichet,
  setRefreshInformatii,
  setNotificare
}: ButonSolutionareProps) => {
  

  const solutionareTichet = async () => {
    try {
      const raspuns = await fetch(process.env.API_BASE + "/api/raport/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_tichet }),
      });
      if (!raspuns.ok) {
        if (raspuns.status === 403) {
          setNotificare({
            open: true,
            mesaj: "Nu aveți permisiune să modificați tichetul!",
            culoare: "#ef5350",
          });
        }
      } else {
        setNotificare({
          open: true,
          mesaj: "Tichetul a fost marcat ca rezolvat!",
          culoare: "#15803d",
        });
        setRefreshInformatii();
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Au existat probleme la soluționarea tichetului",
        culoare: "#ef5350",
      });
    }
  };
  return (
      <Button
        startIcon={<LibraryAddCheckRoundedIcon color="success" />}
        sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        color="inherit"
        size="small"
        onClick={solutionareTichet}>
        <span className="text-green-600 font-bold">Marchează ca rezolvat</span>
      </Button>
  );
};

export default ButonSolutionare;
