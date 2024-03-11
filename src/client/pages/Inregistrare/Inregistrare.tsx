import { Paper } from "@mui/material";
import "./Inregistrare.css";
export default function Inregistrare() {
  return (
    <div className="containerInregistrare">
      <Paper
        sx={{ width: "1000px", heigh: "500px" }}
        variant="elevation"
        className="SignUpForm"
        elevation={3}>
        <div className="firstImage">
          <img src="/pf.svg" alt="" />
        </div>
        <div className="secondImage">
          <img src="/firma.svg" alt="" />
        </div>
      </Paper>
    </div>
  );
}
