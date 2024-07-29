import React from "react";
import { IContainerOptim } from "../../Interfete";
import { Link } from "react-router-dom";
import Header from "../../../../componente/Titluri/Header";

interface DescriereContainerProps {
  container: IContainerOptim | null;
}

const DescriereContainer = ({ container }: DescriereContainerProps) => {
  return (
    container && (
      <Link
        to={`/containere/${container.tip}/${container.container.id_container}`}>
        <section className="w-auto flex flex-col gap-4 mr-4">
          <Header mesaj="Cel mai apropiat container" />
          <div className="border rounded-sm p-2">
            <h1 className="text-lg font-semibold text-gray-500">
              {container.container.denumire}
            </h1>
            {container.container.capacitate && (
              <h2 className="text-gray-500">
                Capacitate:{" "}
                <span className="text-gray-600 font-semibold">
                  {container.container.capacitate} kg
                </span>
              </h2>
            )}{" "}
            <h2 className="text-gray-500">
              Distanța:{" "}
              <span className="text-green-700 font-bold">
                {container.distanta.toFixed(2)} km
              </span>
            </h2>
            {container.dataInceput && container.dataSfarsit && (
              <h2 className="text-gray-500">
                Perioada:{" "}
                <span className="text-gray-600 font-semibold">
                  {new Date(container.dataInceput)
                    .toLocaleDateString()
                    .replaceAll("/", ".")}{" "}
                  -{" "}
                  {new Date(container.dataSfarsit)
                    .toLocaleDateString()
                    .replaceAll("/", ".")}
                </span>
              </h2>
            )}
            {container.pret > 0 && (
              <h2 className="text-gray-500">
                Preț total:{" "}
                <span className="font-semibold text-green-700">
                  {container.pret} RON
                </span>{" "}
              </h2>
            )}
          </div>
        </section>
      </Link>
    )
  );
};

export default DescriereContainer;
