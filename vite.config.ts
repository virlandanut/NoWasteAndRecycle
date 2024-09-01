import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["@mui/material/Tooltip", "@emotion/styled"],
  },
  define: {
    "process.env": {
      API_BASE: process.env.API_BASE,
      API_VALIDARE_USERNAME: process.env.API_VALIDARE_USERNAME,
      API_VALIDARE_CNP: process.env.API_VALIDARE_CNP,
      API_VALIDARE_TELEFON: process.env.API_VALIDARE_TELEFON,
      API_VALIDARE_EMAIL: process.env.API_VALIDARE_EMAIL,
      API_VALIDARE_CIF: process.env.API_VALIDARE_CIF,
      API_VALIDARE_DENUMIRE_CONTAINER:
        process.env.API_VALIDARE_DENUMIRE_CONTAINER,
      API_GET_UTILIZATOR_CURENT: process.env.API_GET_UTILIZATOR_CURENT,
      API_GET_PERSOANA_CURENTA: process.env.API_GET_PERSOANA_CURENTA,
      API_GET_FIRMA_CURENTA: process.env.API_GET_FIRMA_CURENTA,
      API_GET_LOCALITATI: process.env.API_GET_LOCALITATI,
      API_INCHIRIERE_CONTAINER_RECICLARE:
        process.env.API_INCHIRIERE_CONTAINER_RECICLARE,
      API_INCHIRIERE_CONTAINER_DEPOZITARE:
        process.env.API_INCHIRIERE_CONTAINER_DEPOZITARE,
      API_INCHIRIERE_CONTAINER_MATERIALE:
        process.env.API_INCHIRIERE_CONTAINER_MATERIALE,
      API_PLATA: process.env.API_PLATA,
      API_CONTAINER_RECICLARE: process.env.API_CONTAINER_RECICLARE,
      API_CONTAINER_DEPOZITARE: process.env.API_CONTAINER_DEPOZITARE,
      API_CONTAINER_MATERIALE: process.env.API_CONTAINER_MATERIALE,
      API_PERSOANA: process.env.API_PERSOANA,
      API_FIRMA: process.env.API_FIRMA,
      API_UTILIZATOR: process.env.API_UTILIZATOR,
      API_CONTRACT_RECICLARE: process.env.API_CONTRACT_RECICLARE,
      API_CONTRACT_DEPOZITARE: process.env.API_CONTRACT_DEPOZITARE,
      API_RECENZIE: process.env.API_RECENZIE,
      API_CONTAINER: process.env.API_CONTAINER,
      API_CHAT_BOT: process.env.API_CHAT_BOT,
      MAPBOX_SECRET: process.env.MAPBOX_SECRET,
    },
  },
});
