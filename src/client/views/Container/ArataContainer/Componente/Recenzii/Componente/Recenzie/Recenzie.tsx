import { Card, CardContent, CardHeader, Rating, styled } from "@mui/material";
import { RecenzieCompleta } from "../../../../Depozitare/Interfete";
import { OptiuniRecenzie } from "./Componente/OptiuniRecenzie";
import { AvatarUtilizator } from "../../../../../../../componente/Navigare/Componente/ButonProfil/Componente/AvatarUtilizator/AvatarUtilizator";
import { InterfataNotificare } from "../../../../../../../componente/Erori/Notificare/Interfete";
import { ContextUtilizatorCurent } from "../../../../../../../componente/Erori/RutaProtejata";
import React from "react";
import { FormModificaRecenzie } from "../../../../../../Inchirieri/Recenzie/ModificaRecenzie";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface RecenzieProps {
  recenzie: RecenzieCompleta;
  setNotificare: (notificare: InterfataNotificare) => void;
  refreshInformatii: () => void;
}

const Recenzie = (props: RecenzieProps) => {
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const [modificareRecenzie, setModificaRecenzie] =
    React.useState<boolean>(false);

  const deschideModificareRecenzie = () => {
    setModificaRecenzie(true);
  };

  const inchideModificareRecenzie = () => {
    setModificaRecenzie((prev) => !prev);
  };

  let culoare: string;
  if (props.recenzie.rating < 3) {
    culoare = "#f44336";
  } else if (props.recenzie.rating >= 3 && props.recenzie.rating < 4) {
    culoare = "#ffa726";
  } else {
    culoare = "#66bb6a";
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: culoare,
    },
  });

  return (
    utilizatorCurent && (
      <div>
        <Card
          sx={{ boder: "none", boxShadow: "none", borderRadius: "0" }}
          className="w-full border rounded-none mb-1"
          elevation={0}>
          <section className="flex justify-between">
            <CardHeader
              avatar={
                props.recenzie.cnp ? (
                  <AvatarUtilizator
                    poza={props.recenzie.poza}
                    tip={props.recenzie.rol}
                    cnp={props.recenzie.cnp}
                  />
                ) : (
                  <AvatarUtilizator
                    poza={props.recenzie.poza}
                    tip={props.recenzie.rol}
                  />
                )
              }
              title={props.recenzie.denumire}
              sx={{ margin: 0 }}
              subheader={
                <StyledRating
                  value={props.recenzie.rating}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarOutlineIcon fontSize="inherit" />}
                  size="small"
                />
              }
            />
            {(props.recenzie.idUtilizator === utilizatorCurent.id_utilizator ||
              utilizatorCurent.rol === "ADMINISTRATOR") && (
              <div className="h-1/2">
                <OptiuniRecenzie
                  utilizatorCurent={utilizatorCurent.id_utilizator}
                  proprietar={props.recenzie.idUtilizator}
                  refreshInformatii={props.refreshInformatii}
                  setNotificare={props.setNotificare}
                  idRecenzie={props.recenzie.id}
                  modificareRecenzie={deschideModificareRecenzie}
                />
              </div>
            )}
          </section>
          <CardContent sx={{ padding: 0, paddingLeft: 2, paddingRight: 2 }}>
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-green-700">
                A închiriat acest container pe data de{" "}
                {props.recenzie.dataAchizitie}
              </h2>
              <p className="text-gray-500">{props.recenzie.mesaj}</p>
              <div className="flex gap-1 items-center self-end">
                <h5 className=" text-gray-400 text-sm">Postat pe</h5>
                <span className="text-sm font-semibold text-gray-500">
                  {props.recenzie.dataPostare}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <FormModificaRecenzie
          idRecenzie={props.recenzie.id}
          setRefresh={props.refreshInformatii}
          modificaRecenzie={modificareRecenzie}
          inchideModificaRecenzie={inchideModificareRecenzie}
          renunta={inchideModificareRecenzie}
        />
      </div>
    )
  );
};

export default Recenzie;
