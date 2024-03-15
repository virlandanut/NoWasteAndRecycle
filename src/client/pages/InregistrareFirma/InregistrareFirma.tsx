import { Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function InregistrareFirma() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Paper
        className="flex xs:flex-col xs:w-full xs:h-full xs:items-center justify-center sm:w-5/6 sm:h-fit md:w-6/7 lg:flex-row lg:h-3/5 lg:max-w-7xl"
        variant="elevation"
        elevation={3}>
        <div className="flex justify-center items-center xs:w-0 sm:w-3/4 sm:p-5 lg:w-full">
          <img src="/signup.svg"></img>
        </div>
        <div className="flex xs:w-full xs:p-5 lg:justify-center lg:items-center sm:w-6/7 sm:h-2/3">
          <form className="w-full flex flex-col gap-3">
            <h1 className="font-bold text-green-700 text-center uppercase lg:text-xl">
              Înregistrare
            </h1>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row sm:justify-center">
                <TextField
                  className="w-full"
                  label="Denumire *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="denumire"
                />
                <TextField
                  className="w-full"
                  label="CIF *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="cif"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <TextField
                  className="w-full"
                  label="CAEN *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="caen"
                />
                <TextField
                  className="w-full"
                  label="Telefon *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="telefon"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3">
                <TextField
                  className="w-full"
                  label="Adresă *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="adresa"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <TextField
                  className="w-full"
                  label="Nume de utilizator *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="username"
                />
                <TextField
                  className="w-full"
                  label="Email *"
                  color="success"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="email"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex xs:flex-col xs:gap-3 sm:flex-row">
                <TextField
                  className="w-full"
                  label="Parolă *"
                  color="success"
                  variant="outlined"
                  type="password"
                  size="small"
                  name="parola"
                />
                <TextField
                  className="w-full"
                  label="Confirmare parolă *"
                  color="success"
                  variant="outlined"
                  type="password"
                  size="small"
                  name="confirmareParolă"
                />
              </div>
            </div>
            <div className="flex xs:flex-col xs:w-full xs:gap-3 md:flex-row">
              <Button
                className="w-full"
                type="submit"
                variant="contained"
                color="success"
                size="large">
                Creare Cont
              </Button>
              <Button
                className="w-full"
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
