import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
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
    rol: "",
  });

  const [parolaConf, setParolaConf] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const camp = event.target.name;
    const valoareNoua = event.target.value;

    setUtilizator((valoareVeche) => ({ ...valoareVeche, [camp]: valoareNoua }));
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setUtilizator((valoareVeche) => ({
      ...valoareVeche,
      ["rol"]: event.target.value,
    }));
  };

  const handleChangeParolaConf = (event: ChangeEvent<HTMLInputElement>) => {
    setParolaConf(event.target.value);
  };

  const verificareParola = (parola: string, confirmare: string) => {
    return parola === confirmare;
  };

  const creareCont = () => {
    setUtilizator({
      email: "",
      username: "",
      parola: "",
      dataInscriere: new Date(moment().format("YYYY/MM/D")),
      telefon: "",
      adresa: "",
      rol: "",
    });
    setParolaConf("");
    console.log(utilizator);
  };

  return (
    <div className="background-container">
      <form className="SignUpForm">
        <h1>Înregistrare</h1>
        <div className="input">
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
        </div>
        <div className="input">
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
        <div className="input">
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
        </div>
        <div className="input">
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
              "Parolele nu coincid"
            }
            required
          />
        </div>
        <div className="input">
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
        <div className="input">
          <TextField
            label="Adresă"
            color="success"
            type="text"
            variant="outlined"
            size="small"
            value={utilizator.adresa}
            onChange={handleChange}
            name="adresa"
            required
          />
        </div>
        <div className="input">
          <FormControl sx={{ width: "308px" }} size="small">
            <InputLabel id="labelComboBox">Tipul contului</InputLabel>
            <Select
              labelId="labelComboBox"
              value={utilizator.rol}
              label="Tipul contului"
              onChange={handleChangeSelect}
              color="success">
              <MenuItem value={"standard"}>Utilizator standard</MenuItem>
              <MenuItem value={"firma"}>Firmă</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="butoane">
          <Button variant="contained" color="success" onClick={creareCont}>
            Creare Cont
          </Button>
          <Button variant="outlined" color="success">
            Autentificare
          </Button>
        </div>
      </form>
    </div>
  );
}
