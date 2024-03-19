import { PropsSectiune } from "../../../../../interfaces.js";

const SectiuneButoane: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <section className={tailwind}>{children}</section>;
};

export default SectiuneButoane;
