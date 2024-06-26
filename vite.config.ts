import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
    },
  },
});
