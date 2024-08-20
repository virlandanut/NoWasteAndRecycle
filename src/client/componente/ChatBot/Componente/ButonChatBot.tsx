import React from "react";
import { Fab } from "@mui/material";

interface ButonChatBotProps {
  setOpenChatBot: () => void;
}

export const ButonChatBot = (props: ButonChatBotProps) => {
  const [rotate, setRotate] = React.useState<boolean>(false);
  const handleClick = () => {
    props.setOpenChatBot();
    setRotate((prev) => !prev);
  };
  return (
    <Fab
      sx={{ position: "fixed", top: "92%", left: "95%", zIndex: "1000" }}
      onClick={handleClick}
      color={rotate ? "error" : "success"}>
      <svg
        style={{
          transform: rotate ? "rotate(360deg)" : "",
          transition: "all 0.5s ease-out",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24">
        <path
          fill="white"
          d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8"
        />
      </svg>
    </Fab>
  );
};
