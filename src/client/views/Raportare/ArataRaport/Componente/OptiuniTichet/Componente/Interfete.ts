import { Notificare } from "../../AdaugaComentariu/Interfete";

export interface ButonStergereProps {
  id_tichet: number;
  setNotificare: ({ open, mesaj, culoare }: Notificare) => void;
}
export interface ButonSolutionareProps {
  id_tichet: number;
  setRefreshInformatii: () => void;
  setNotificare: ({ open, mesaj, culoare }: Notificare) => void;
}

export interface OptiuneTichetProps {
  id_tichet: number;
  status: number;
  setRefreshInformatii: () => void;
  setNotificare: ({ open, mesaj, culoare }: Notificare) => void;
}
