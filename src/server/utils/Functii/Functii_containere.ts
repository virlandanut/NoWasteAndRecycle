import { Container } from "../../../interfaces/Interfete_Container.js";
import { FormContainer } from "../../../interfaces/Interfete_Frontend.js";

export const creareContainer = (formData: FormContainer): Container => {
  return {
    denumire: formData.denumire,
    capacitate: formData.capacitate,
    strada: formData.strada,
    numar: formData.numar,
    descriere: formData.descriere,
  };
};
