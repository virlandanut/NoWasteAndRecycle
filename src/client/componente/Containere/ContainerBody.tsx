import { ReactNode } from "react";
import BaraNavigare from "../Navigare/BaraNavigare";
import { Container } from "@mui/material";

type ContainerBodyProps = {
  tailwind?: string;
  children: ReactNode;
};
export default function ContainerBody({
  tailwind,
  children,
}: ContainerBodyProps) {
  return (
    <>
      <BaraNavigare />
      <Container className={tailwind} sx={{ height: "100vh", boxShadow: 0 }}>
        {children}
      </Container>
    </>
  );
}
