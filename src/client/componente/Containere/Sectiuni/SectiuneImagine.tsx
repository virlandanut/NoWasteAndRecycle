import { PropsSectiuneImagine } from "../../../../../interfaces";

const SectiuneImagine: React.FC<PropsSectiuneImagine> = ({
  tailwind,
  tailwindImagine,
  sursaImagine,
}) => {
  return (
    <section className={tailwind}>
      <img className={tailwindImagine} src={sursaImagine} alt="" />
    </section>
  );
};

export default SectiuneImagine;
