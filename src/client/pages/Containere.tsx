import ContainerBody from "../componente/Containere/ContainerBody";
import ContainerInchiriat from "../componente/Containere/ContainerInchiriat";
import SectiuneMain from "../componente/Containere/Sectiuni/SectiuneMain";

export default function Containere() {
  return (
    <ContainerBody>
      <h1>Containere</h1>
      <ContainerInchiriat />
    </ContainerBody>
  );
}
