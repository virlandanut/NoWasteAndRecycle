import { PropsSectiune } from "../../../../interfaces/Interfete_Frontend.js";

const SectiuneButoane: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <section className={tailwind}>{children}</section>;
};

export default SectiuneButoane;
