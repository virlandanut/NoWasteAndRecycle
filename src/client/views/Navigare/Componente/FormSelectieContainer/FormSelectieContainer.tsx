import { IContainerOptim, ICoordonate } from "../../Interfete";
import FormSelectieContainerReciclare from "./Componente/Formuri/Reciclare/FormSelectieReciclare";

interface FormSelectieContainerProps {
  setContainer: (container: IContainerOptim | null) => void;
}

const FormSelectieContainer = ({
  setContainer,
}: FormSelectieContainerProps) => {
  return <FormSelectieContainerReciclare setContainer={setContainer} />;
};

export default FormSelectieContainer;
