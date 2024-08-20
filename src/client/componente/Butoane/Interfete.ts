import { InterfataNotificare } from "../Erori/Notificare/Interfete";

export interface ButonSchimbareStatusProps {
  id?: number;
  setNotificare: (notificare: InterfataNotificare) => void;
}

export interface PropsButonNavigare {
  ruta: string;
  text: string;
  culoare?: string;
  culoareTextHover?: string;
}

export interface PropsButonRedirect {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  size?: "small" | "large";
  catre: string;
  text: string;
}

export interface PropsButonSubmit {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  text: string;
  color?:
    | "success"
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  form?: string;
  disabled?: boolean;
}
