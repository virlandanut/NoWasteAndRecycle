import { useParams } from "react-router-dom";
import ContainerBody from "../componente/Containere/ContainerBody";
import { useEffect, useState } from "react";
import { ContainerInchiriere } from "../../../interfaces";

const Container = () => {
  const { id } = useParams<{ id: string }>();
  const [containerInchiriere, setContainerInchiriere] =
    useState<ContainerInchiriere>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raspuns = await fetch(
          process.env.API_BASE + `/api/containere/${id}`
        );
        if (!raspuns.ok) {
          throw new Error("Containerul nu a fost trimis de către server");
        }
        const data = await raspuns.json();
        setContainerInchiriere(data);
      } catch (eroare) {
        throw new Error("Nu există o conexiune activă cu server-ul");
      }
    };
    fetchData();
  }, [id]);

  return (
    <ContainerBody>
      {containerInchiriere ? (
        <div>{containerInchiriere.denumire}</div>
      ) : (
        <div>Loading...</div>
      )}
    </ContainerBody>
  );
};

export default Container;
