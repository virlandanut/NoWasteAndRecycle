import { Avatar } from "@mui/material";
import React from "react";
import {
  ContextFirmaCurenta,
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
} from "../../Erori/RutaProtejata";

interface UserCommentProps {
  mesaj: string;
}

export const UserComment = (props: UserCommentProps) => {
  const { utilizatorCurent } = React.useContext(ContextUtilizatorCurent);
  const { firmaCurenta } = React.useContext(ContextFirmaCurenta);
  const { persoanaCurenta } = React.useContext(ContextPersoanaCurenta);

  return (
    utilizatorCurent && (
      <div className="flex flex-col gap-4 w-2/3 border px-4 py-4 rounded-md self-end">
        <section className="flex gap-2 items-center">
          <Avatar src={utilizatorCurent.poza ? utilizatorCurent.poza : ""} />
          <div>
            <h1 className="font-bold text-sm text-green-700">
              {persoanaCurenta
                ? `${persoanaCurenta.nume} ${persoanaCurenta.prenume}`
                : firmaCurenta
                  ? firmaCurenta.denumire_firma
                  : "Utilizator"}
            </h1>
            <h2 className="text-xs">{`${utilizatorCurent.rol[0]}${utilizatorCurent.rol.substring(1).toLowerCase()}`}</h2>
          </div>
        </section>
        <p className="text-sm text-gray-500">{props.mesaj}</p>
        <h3 className="text-xs text-gray-400 self-end">
          {new Date().toLocaleString()}
        </h3>
      </div>
    )
  );
};
