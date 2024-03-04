import { Button, TextField } from "@mui/material";
import "./Autentificare.css";
import { ChangeEvent, useState } from "react";

export default function Autentificare() {
  const [utilizator, setUtilizator] = useState({ username: "", parola: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = event.target.value;

    setUtilizator((valoareVeche) => {
      return { ...valoareVeche, [field]: value };
    });
  };

  const autentificare = () => console.log(utilizator);

  return (
    <div className="background-container">
      <form className="SignInForm">
        <h1>Autentificare</h1>
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

        <div className="butoane">
          <Button variant="contained" color="success" onClick={autentificare}>
            Autentificare
          </Button>
          <Button variant="outlined" color="success">
            Înregistrare
          </Button>
        </div>
      </form>
    </div>
  );
}
