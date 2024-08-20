import { Avatar } from "@mui/material";
import React from "react";
import {
  ContextFirmaCurenta,
  ContextPersoanaCurenta,
  ContextUtilizatorCurent,
} from "../../Erori/RutaProtejata";
import { Firma, Persoana_fizica, Utilizator } from "@prisma/client";

interface UserCommentProps {
  mesaj: string;
  utilizatorCurent: Utilizator | null;
  persoanaCurenta: Persoana_fizica | null;
  firmaCurenta: Firma | null;
}

export const UserComment = (props: UserCommentProps) => {
  return (
    props.utilizatorCurent && (
      <div className="flex flex-col gap-4 w-2/3 border px-4 py-4 rounded-md self-end">
        <section className="flex gap-2 items-center">
          <Avatar
            src={props.utilizatorCurent.poza ? props.utilizatorCurent.poza : ""}
          />
          <div>
            <h1 className="font-bold text-sm text-green-700">
              {props.persoanaCurenta
                ? `${props.persoanaCurenta.nume} ${props.persoanaCurenta.prenume}`
                : props.firmaCurenta
                  ? props.firmaCurenta.denumire_firma
                  : "Utilizator"}
            </h1>
            <h2 className="text-xs">{`${props.utilizatorCurent.rol[0]}${props.utilizatorCurent.rol.substring(1).toLowerCase()}`}</h2>
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
