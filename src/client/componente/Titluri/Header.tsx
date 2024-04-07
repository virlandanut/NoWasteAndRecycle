interface headerProps {
  mesaj: string;
  marime?: string;
}

const Header: React.FC<headerProps> = ({ mesaj, marime = "xl" }) => {
  return (
    <h1
      className={`font-bold text-green-700 text-center uppercase lg:text-${marime}`}>
      {mesaj}
    </h1>
  );
};

export default Header;
