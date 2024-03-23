import { ReactNode } from "react";
import BaraNavigare from "../Navigare/BaraNavigare";
import { Container } from "@mui/material";

type ContainerBodyProps = {
  children: ReactNode;
};
export default function ContainerBody({ children }: ContainerBodyProps) {
  return (
    <>
      <BaraNavigare />
      <Container sx={{ height: "100vh", boxShadow: 0 }}>{children}</Container>
    </>
  );
}
