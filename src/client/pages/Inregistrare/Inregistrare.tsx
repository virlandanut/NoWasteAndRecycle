import { Paper } from "@mui/material";
import "./Inregistrare.css";
import { Link } from "react-router-dom";
export default function Inregistrare() {
  return (
    <div className="containerInregistrare">
      <Paper
        sx={{
          width: "915px",
          display: "flex",
          justifyContent: "center",
          padding: "0px",
          "@media (max-width: 480px)": {
            width: "372px",
            height: "680px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 0px",
          },
        }}
        variant="elevation"
        className="SignUpForm"
        elevation={3}>
        <div className="firstImage" style={{ margin: 0 }}>
          <h1>Persoană fizică</h1>
          <Link to={"/register/persoana"}>
            {" "}
            <img className="pf" src="/pf.svg" alt="" />
          </Link>
        </div>
        <div className="secondImage" style={{ margin: 0 }}>
          <h1>Persoană juridică</h1>
          <img className="firma" src="/firma.svg" alt="" />
        </div>
      </Paper>
    </div>
  );
}
