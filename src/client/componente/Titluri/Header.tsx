import { headerInterfata } from "../../../../interfaces";

const Header: React.FC<headerInterfata> = ({ mesaj, marime = "xl" }) => {
  return (
    <h1
      className={`font-bold text-green-700 text-center uppercase lg:text-${marime}`}>
      {mesaj}
    </h1>
  );
};

export default Header;
