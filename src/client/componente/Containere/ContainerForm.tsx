import { PropsSectiune } from "../../../interfaces/Interfete_Frontend";

const ContainerForm: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <div className={tailwind}>{children}</div>;
};

export default ContainerForm;
