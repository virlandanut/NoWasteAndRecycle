import { PropsSectiune } from "../../../../interfaces";

const ContainerForm: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <div className={tailwind}>{children}</div>;
};

export default ContainerForm;