import BaraNavigare from "../../Navigare/BaraNavigare";
import { Outlet } from "react-router-dom";
import Footer from "../../Navigare/Footer";

const Layout = () => {
  return (
    <>
      <BaraNavigare />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
