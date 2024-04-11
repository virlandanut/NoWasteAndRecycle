import BaraNavigare from "../../Navigare/BaraNavigare";
import { Outlet } from "react-router-dom";
import Footer from "../../Navigare/Footer";

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
