import { Rating, styled } from "@mui/material";
import React from "react";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface RatingProps {
  idContainer: number;
}

const RatingContainer: React.FC<RatingProps> = ({ idContainer }) => {
  const [rating, setRating] = React.useState<number>(0);
  const [numarRecenzii, setNumarRecenzii] = React.useState<number>(0);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  let culoare: string;
  if (rating < 3) {
    culoare = "#f44336";
  } else if (rating >= 3 && rating < 4) {
    culoare = "#ffa726";
  } else {
    culoare = "#66bb6a";
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: culoare,
    },
  });

  React.useEffect(() => {
    const fetchRating = async () => {
      try {
        const api: string | undefined = process.env.API_CONTAINER_DEPOZITARE;
        if (!api) {
          setNotificare({
            open: true,
            mesaj: "API-ul ratingului este eronat",
            tip: "eroare",
          });
          return;
        }
        const raspuns = await fetch(api + `/${idContainer}/rating`);
        if (!raspuns.ok) {
          setNotificare({
            open: true,
            mesaj: "Eroare la obținerea ratingului",
            tip: "eroare",
          });
          return;
        }
        const data = await raspuns.json();
        setRating(data.rating);
        setNumarRecenzii(data.numarRecenzii);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj: "Eroare la obținerea ratingului",
          tip: "eroare",
        });
      }
    };

    fetchRating();
  }, []);

  return (
    <div className="flex items-center gap-2 mb-2">
      <StyledRating
        precision={0.5}
        value={rating}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        readOnly
      />
      <h4 className="text-base font-semibold text-gray-400">
        {numarRecenzii} {numarRecenzii > 1 ? "recenzii" : "recenzie"}
      </h4>
    </div>
  );
};

export default RatingContainer;
