export interface InterfataNotificare {
  open: boolean;
  mesaj: string;
  tip: "succes" | "eroare" | "";
}

export interface NotificareProps {
  notificare: InterfataNotificare;
  setNotificare: (notificare: InterfataNotificare) => void;
}
