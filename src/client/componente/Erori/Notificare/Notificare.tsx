import { Snackbar, SnackbarContent } from "@mui/material";
import { NotificareProps } from "./Interfete";

const Notificare = ({ notificare, setNotificare }: NotificareProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => setNotificare({ open: false, mesaj: "", tip: "" })}
      open={notificare.open}
      autoHideDuration={2500}
      message={notificare.mesaj}>
      <SnackbarContent
        style={{
          backgroundColor: notificare.tip === "succes" ? "#2e7d32" : "#d32f2f",
        }}
        message={<span className="font-semibold">{notificare.mesaj}</span>}
      />
    </Snackbar>
  );
};

export default Notificare;
