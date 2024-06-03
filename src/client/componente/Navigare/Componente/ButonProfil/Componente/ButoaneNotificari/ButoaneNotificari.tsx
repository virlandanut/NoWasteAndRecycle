import FlagIcon from "@mui/icons-material/Flag";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { TichetRaportare } from "../../../../../../../server/Routes/Raportare/Interfete";
import ButonNavigare from "../../../../../Butoane/ButonNavigare";
import ButonNavigareRaport from "./Componente/ButonNavigareRaport";

interface eroareFetchDataTichete {
  eroare: boolean;
  mesaj: string;
}

const ButoaneNotificari = () => {
  const [elementHTML, setElementHTML] = useState<null | HTMLElement>(null);
  const [tichete, setTichete] = useState<TichetRaportare[]>([]);
  const [eroare, setEroare] = useState<eroareFetchDataTichete>({
    eroare: false,
    mesaj: "",
  });
  const open = Boolean(elementHTML);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElementHTML(event.currentTarget);
  };
  const handleClose = () => {
    setElementHTML(null);
  };

  useEffect(() => {
    const getTichete = async () => {
      const rezultat = await fetch(process.env.API_BASE + "/api/raport");
      if (rezultat.ok) {
        const data = await rezultat.json();
        const tichete: TichetRaportare[] = data.tichete;
        setTichete(tichete);
      } else if (rezultat.status === 404) {
        setEroare({
          eroare: true,
          mesaj: "Nu aveți niciun tichet activ!",
        });
      } else if (rezultat.status === 400) {
        setEroare({
          eroare: true,
          mesaj: "Neautorizat! Utilizatorul nu există în sesiune",
        });
      }
    };
    getTichete();
  }, []);
  return (
    <div>
      <IconButton
        id="butonMesaje"
        aria-controls={open ? "meniu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <Badge badgeContent={0} color="error">
          <FlagIcon color="success" fontSize="medium" />
        </Badge>
      </IconButton>
      {tichete.length > 0 ? (
        <Menu
          id="meniu"
          MenuListProps={{ "aria-labelledby": "butonMesaje" }}
          anchorEl={elementHTML}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: 45 * 4.5,
                width: "auto",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          {tichete.map((tichet) => (
            <MenuItem>
              <ButonNavigareRaport
                key={tichet.id_raport_problema}
                text={tichet.titlu}
                ruta={`/raport/${tichet.id_raport_problema}`}
                status={tichet.status}
              />
            </MenuItem>
          ))}
        </Menu>
      ) : (
        <Menu
          id="meniuMesaj"
          anchorEl={elementHTML}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "butonMesaje",
          }}
          slotProps={{
            paper: {
              sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: "auto",
                width: "40ch",
                padding: "2rem",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <section className="flex flex-col items-center justify-center gap-8">
            <p className="text-base font-semibold text-gray-600 text-center">
              <span className="text-red-600 font-bold">
                Nu aveți niciun tichet trimis.
              </span>{" "}
              Dacă aveți vreo problemă nu ezitați să ne aduceți la cunoștință!
            </p>
            <img className="w-3/4" src="404.svg" alt="" />
          </section>
        </Menu>
      )}
    </div>
  );
};

export default ButoaneNotificari;
