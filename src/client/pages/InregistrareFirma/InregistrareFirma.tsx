import { Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./InregistrareFirma.css";

export default function InregistrareFirma() {
  return (
    <div className="container">
      <Paper variant="elevation" className="SignUpForm" elevation={3}>
        <div className="imagineSignUp">
          <img className="registerImage" src="/signup.svg"></img>
        </div>
        <div className="form-container">
          <form>
            <h1>Înregistrare</h1>
            <div className="input">
              <div className="rand">
                <TextField
                  label="Denumire *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="denumire"
                />
                <TextField
                  label="CIF *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="cif"
                />
              </div>
            </div>
            <div className="input">
              <div className="rand">
                <TextField
                  label="CAEN *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="caen"
                />
                <TextField
                  label="Telefon *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="telefon"
                />
              </div>
            </div>
            <div className="input">
              <div className="rand">
                <TextField
                  className="adresa"
                  label="Adresă *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="adresa"
                />
              </div>
            </div>
            <div className="input">
              <div className="rand">
                <TextField
                  label="Nume de utilizator *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="username"
                />
                <TextField
                  label="Email *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="email"
                />
              </div>
            </div>
            <div className="input">
              <div className="rand">
                <TextField
                  label="Parolă *"
                  color="success"
                  variant="outlined"
                  type="password"
                  size="small"
                  name="parola"
                />
                <TextField
                  label="Confirmare parolă *"
                  color="success"
                  variant="outlined"
                  type="password"
                  size="small"
                  name="confirmareParolă"
                />
              </div>
            </div>
            <div className="butoane">
              <Button
                className="submit"
                type="submit"
                variant="contained"
                color="success"
                size="large">
                Creare Cont
              </Button>
              <Button
                className="auth"
                variant="outlined"
                color="success"
                size="large">
                <Link style={{ color: "green" }} to="/login">
                  Autentificare
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
