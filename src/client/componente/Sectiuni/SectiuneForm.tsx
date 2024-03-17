import { PropsSectiune } from "../../../../interfaces.js";

const SectiuneForm: React.FC<PropsSectiune> = ({ children }) => {
  return (
    <div className="flex xs:flex-col xs:gap-3 sm:flex-row">{children}</div>
  );
};

export default SectiuneForm;
