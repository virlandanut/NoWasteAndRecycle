import ContainerBody from "../componente/Containere/ContainerBody";
import ContainerInchiriat from "../componente/Containere/ContainerInchiriat";

export default function Containere() {
  const containerInchiriere = {
    denumire: "RC27B",
    adresa: "Strada Productelor, Constanța, 900178",
    capacitate: "500",
    firma: "SC MIMA-COS SRL",
    aprobare: true,
    tarif: "1200",
  };
  return (
    <ContainerBody tailwind="mt-10">
      <div className="flex justify-between flex-wrap gap-12">
        <ContainerInchiriat props={containerInchiriere} />
      </div>
    </ContainerBody>
  );
}
