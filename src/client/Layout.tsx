import { Outlet } from "react-router-dom";
import BaraNavigare from "./componente/Navigare/BaraNavigare.js";
import Footer from "./componente/Navigare/Footer.js";

const Layout = () => {
  return (
    <>
      <BaraNavigare />
      <main className="min-w-screen min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
