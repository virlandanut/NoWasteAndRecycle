import React from "react";
import { IContainerOptim } from "../../Interfete";
import ToggleFormNavigare from "../ToggleFormNavigare";
import FormSelectie from "./Componente/Formuri/Reciclare/FormSelectie";
import { Utilizator } from "@prisma/client";

interface FormSelectieContainerProps {
  setContainer: (container: IContainerOptim | null) => void;
  utilizatorCurent: Utilizator | null;
}

const FormSelectieContainer = (props: FormSelectieContainerProps) => {
  const [toggle, setToggle] = React.useState<
    "RECICLARE" | "DEPOZITARE" | "MATERIALE"
  >("RECICLARE");

  return (
    <React.Fragment>
      <ToggleFormNavigare toggle={toggle} setToggle={setToggle} />
      <FormSelectie
        tipContainer={toggle}
        setContainer={props.setContainer}
        utilizatorCurent={props.utilizatorCurent}
      />
    </React.Fragment>
  );
};

export default FormSelectieContainer;
