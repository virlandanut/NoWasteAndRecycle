import { Button } from "@mui/material";

interface ButonSchimbareDateContProps {
  deschideSchimbareDateCont: () => void;
}

const ButonSchimbareDateCont = ({
  deschideSchimbareDateCont,
}: ButonSchimbareDateContProps) => {
  return (
    <Button
      sx={{
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
      }}
      color="inherit"
      size="small"
      onClick={deschideSchimbareDateCont}>
      Schimbare date cont
    </Button>
  );
};

export default ButonSchimbareDateCont;
