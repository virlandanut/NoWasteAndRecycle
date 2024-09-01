import React from "react";
import { Fab } from "@mui/material";
import { contextChat } from "../ChatBot";

export const ButonChatBot = () => {
  const { setOpenChatBot } = React.useContext(contextChat);
  const [rotate, setRotate] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpenChatBot((prev) => !prev);
    setRotate((prev) => !prev);
  };

  return (
    <Fab
      sx={{ position: "fixed", top: "92%", left: "95%", zIndex: "1000" }}
      onClick={handleClick}
      color={rotate ? "error" : "success"}
    >
      <img
        src="/leafy.png"
        alt="leafy"
        style={{
          transform: rotate ? "rotate(360deg)" : "",
          transition: "all 0.5s ease-out",
          width: "24px",
          height: "24px",
        }}
      />
    </Fab>
  );
};
