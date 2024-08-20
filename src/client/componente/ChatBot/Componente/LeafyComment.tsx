import { Avatar } from "@mui/material";
import React from "react";

interface LeafyCommentProps {
  mesaj: string;
  marginTop?: boolean;
}

export const LeafyComment = (props: LeafyCommentProps) => {
  return (
    <div className="flex flex-col gap-4 w-2/3 border px-4 py-4 rounded-md ">
      <section className="flex gap-2 items-center">
        <Avatar
          sx={{ backgroundColor: "green", width: "2.2rem", height: "2.2rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 24 24">
            <path
              fill="white"
              d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8"
            />
          </svg>
        </Avatar>
        <div>
          <h1 className="font-bold text-sm text-green-700">Leafy</h1>
          <h2 className="text-xs">Support bot</h2>
        </div>
      </section>
      <p className="text-sm text-gray-500">{props.mesaj}</p>
      <h3 className="text-xs text-gray-400 self-end">
        {new Date().toLocaleString()}
      </h3>
    </div>
  );
};
