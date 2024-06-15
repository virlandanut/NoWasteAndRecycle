import { Switch } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

interface SwitchAprobareProps {
  id_utilizator: number;
  status_aprobare: number;
}

const SwitchAprobare = ({
  id_utilizator,
  status_aprobare,
}: SwitchAprobareProps) => {
  const status: boolean = status_aprobare === 0 ? false : true;
  const [bifat, setBifat] = useState<boolean>(status);
  const [primaRandare, setPrimaRandare] = useState<boolean>(true);

  useEffect(() => {
    if (primaRandare === false) {
      const schimbaDrepturiFirma = async () => {
        try {
          await fetch(
            process.env.API_BASE + `/api/utilizatori/firma/schimbaDrepturi`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_utilizator, bifat }),
            }
          );
        } catch (eroare) {
          console.log(eroare);
        }
      };
      schimbaDrepturiFirma();
    }
  }, [bifat]);

  const schimbaDrepturi = (event: ChangeEvent<HTMLInputElement>) => {
    setBifat(event.target.checked);
    setPrimaRandare(false);
  };
  return (
    <Switch
      size="medium"
      color="success"
      checked={bifat}
      onChange={schimbaDrepturi}
    />
  );
};

export default SwitchAprobare;
