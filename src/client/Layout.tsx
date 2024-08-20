import { Outlet } from "react-router-dom";
import BaraNavigare from "./componente/Navigare/BaraNavigare.js";
import Footer from "./componente/Navigare/Footer.js";
import { ButonChatBot } from "./componente/ChatBot/Componente/ButonChatBot.js";
import { ChatBot } from "./componente/ChatBot/ChatBot.js";

const Layout = () => {
  return (
    <>
      <BaraNavigare />
      <main className="min-w-screen min-h-screen">
        <Outlet />
        <ChatBot />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
