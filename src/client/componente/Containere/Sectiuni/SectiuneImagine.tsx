interface PropsSectiuneImagine {
  tailwind?: string;
  tailwindImagine?: string;
  sursaImagine: string;
}

export default function SectiuneImagine({
  tailwind,
  tailwindImagine,
  sursaImagine,
}: PropsSectiuneImagine) {
  return (
    <section className={tailwind}>
      <img className={tailwindImagine} src={sursaImagine} alt="" />
    </section>
  );
}
