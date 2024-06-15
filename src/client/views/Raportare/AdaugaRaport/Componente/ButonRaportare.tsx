import { Button } from "@mui/material";

interface ButonRaportareProps {
  deschideRaport: () => void;
}

export default function ButonRaportare({
  deschideRaport,
}: ButonRaportareProps) {
  return (
    <Button
      sx={{
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
      }}
      color="inherit"
      size="small"
      onClick={deschideRaport}>
      Tichet problemă
    </Button>
  );
}
