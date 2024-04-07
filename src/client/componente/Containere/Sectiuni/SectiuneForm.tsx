import { PropsSectiune } from "../../../../interfaces/Interfete_Frontend";

const SectiuneForm: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <section className={tailwind}>{children}</section>;
};

export default SectiuneForm;
