import React from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Badge } from "@mui/material";

const ButoaneNotificari = () => {
  return (
    <>
      <Badge badgeContent={4} color="error">
        <EmailRoundedIcon color="success" fontSize="medium" />
      </Badge>
    </>
  );
};

export default ButoaneNotificari;
