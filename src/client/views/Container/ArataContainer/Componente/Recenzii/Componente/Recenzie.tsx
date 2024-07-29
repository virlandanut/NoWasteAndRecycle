import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { RecenzieCompleta } from "../../../Depozitare/Interfete";

const Recenzie = ({ recenzie }: { recenzie: RecenzieCompleta }) => {
  let culoare: string;
  if (recenzie.rating < 3) {
    culoare = "#f44336";
  } else if (recenzie.rating >= 3 && recenzie.rating < 4) {
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
    <div>
      <Card
        sx={{ boder: "none", boxShadow: "none", borderRadius: "0" }}
        className="w-full border rounded-none mb-1"
        elevation={0}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: green[500] }} src="/danut.jpg" />}
          title={recenzie.denumire}
          sx={{ margin: 0 }}
          subheader={
            <StyledRating
              value={recenzie.rating}
              precision={0.5}
              readOnly
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              size="small"
            />
          }
        />
        <CardContent sx={{ padding: 0, paddingLeft: 2, paddingRight: 2 }}>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-green-700">
              A închiriat acest container pe date de {recenzie.dataAchizitie}
            </h2>
            <p className="text-gray-500">{recenzie.mesaj}</p>
            <div className="flex gap-1 items-center self-end">
              <h5 className=" text-gray-400 text-sm">Postat pe</h5>
              <span className="text-sm font-semibold text-gray-500">
                {recenzie.dataPostare}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recenzie;
