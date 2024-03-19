import { PropsSectiune } from "../../../../../interfaces.js";

const SectiuneForm: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <section className={tailwind}>{children}</section>;
};

export default SectiuneForm;
