import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import moment from "moment";
import "./Inregistrare.css";

export default function Inregistrare() {
  const [utilizator, setUtilizator] = useState({
    email: "",
    username: "",
    parola: "",
    dataInscriere: new Date(moment().format("YYYY/MM/D")),
    telefon: "",
    adresa: "",
    rol: "standard",
  });

  const [persoana, setPersoana] = useState({
    nume: "",
    prenume: "",
    CNP: "",
    rol: "standard",
  });

  const [parolaConf, setParolaConf] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const camp = event.target.name;
    const valoareNoua = event.target.value;

    setUtilizator((valoareVeche) => ({ ...valoareVeche, [camp]: valoareNoua }));
  };

  const handleChangeParolaConf = (event: ChangeEvent<HTMLInputElement>) => {
    setParolaConf(event.target.value);
  };

  const handleChangePersoana = (event: ChangeEvent<HTMLInputElement>) => {
    const camp = event.target.name;
    const valoareNoua = event.target.value;

    setPersoana((valoareVeche) => ({ ...valoareVeche, [camp]: valoareNoua }));
  };

  const verificareParola = (parola: string, confirmare: string) => {
    return parola === confirmare;
  };

  const creareCont = async () => {
    try {
      await fetch(process.env.API_BASE + "/api/utilizatori/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilizator),
      }).then((res) => res.json());

      setUtilizator({
        email: "",
        username: "",
        parola: "",
        dataInscriere: new Date(moment().format("YYYY/MM/D")),
        telefon: "",
        adresa: "",
        rol: "standard",
      });
      setParolaConf("");
    } catch (eroare) {
      console.log("Eroare la adaugarea utilizatorului: ", eroare);
    }
  };

  return (
    <div className="background-container">
      <form className="SignUpForm">
        <h1>Înregistrare</h1>
        <div className="input">
          <div className="rand">
            <TextField
              label="Nume"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              value={persoana.nume}
              onChange={handleChangePersoana}
              name="nume"
              required
            />
            <TextField
              label="Prenume"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              value={persoana.prenume}
              onChange={handleChangePersoana}
              name="prenume"
              required
            />
          </div>
        </div>
        <div className="input">
          <div className="rand">
            <TextField
              label="CNP"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              value={persoana.CNP}
              onChange={handleChangePersoana}
              name="CNP"
              required
            />
            <TextField
              label="Telefon"
              color="success"
              variant="outlined"
              type="text"
              size="small"
              value={utilizator.telefon}
              onChange={handleChange}
              name="telefon"
              required
            />
          </div>
        </div>
        <div className="input">
          <TextField
            label="Adresă"
            color="success"
            type="text"
            variant="outlined"
            size="small"
            value={utilizator.adresa}
            onChange={handleChange}
            style={{ width: "470px" }}
            name="adresa"
            required
          />
        </div>
        <div className="input">
          <div className="rand">
            <TextField
              label="Nume de utilizator"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              value={utilizator.username}
              onChange={handleChange}
              name="username"
              required
            />
            <TextField
              label="Email"
              color="success"
              type="text"
              variant="outlined"
              size="small"
              value={utilizator.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
        </div>
        <div className="input">
          <div className="rand">
            <TextField
              error={!verificareParola(utilizator.parola, parolaConf)}
              label="Parolă"
              color="success"
              variant="outlined"
              type="password"
              size="small"
              value={utilizator.parola}
              onChange={handleChange}
              name="parola"
              required
            />
            <TextField
              error={!verificareParola(utilizator.parola, parolaConf)}
              label="Confirmare parolă"
              color="success"
              variant="outlined"
              type="password"
              size="small"
              value={parolaConf}
              onChange={handleChangeParolaConf}
              name="confirmareParola"
              helperText={
                !verificareParola(utilizator.parola, parolaConf) &&
                "Parolele trebuie să coincidă!"
              }
              required
            />
          </div>
        </div>
        <div className="butoane">
          <Button
            style={{ marginRight: "20px" }}
            variant="contained"
            color="success"
            onClick={creareCont}
            size="large">
            Creare Cont
          </Button>
          <Button
            style={{ marginLeft: "25px" }}
            variant="outlined"
            color="success"
            size="large">
            Autentificare
          </Button>
        </div>
      </form>
    </div>
  );
}
