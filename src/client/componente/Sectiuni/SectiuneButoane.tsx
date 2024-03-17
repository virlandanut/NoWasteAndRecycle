import { PropsSectiune } from "../../../../interfaces.js";

const SectiuneButoane: React.FC<PropsSectiune> = ({ children }) => {
  return (
    <div className="flex xs:flex-col xs:gap-3 md:flex-row">{children}</div>
  );
};

export default SectiuneButoane;
