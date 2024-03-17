import { PropsSectiuneImagine } from "../../../../interfaces";

const SectiuneImagine: React.FC<PropsSectiuneImagine> = ({ sursaImagine }) => {
  return (
    <div className="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5 lg:w-full">
      <img src={sursaImagine} alt="" />
    </div>
  );
};

export default SectiuneImagine;
