import { ReactNode } from "react";
import BaraNavigare from "../../Navigare/BaraNavigare";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <BaraNavigare />
      {children}
    </>
  );
};

export default Layout;
