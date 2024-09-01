import { shuffle } from "./functiiAjutatoare.js";
import fs from "fs";
import { ContainerPartial } from "./GA.js";

const data = fs.readFileSync("src/server/Utils/GA/containere.json", "utf-8");
const dateContainere = JSON.parse(data);
const containere: ContainerPartial[] = dateContainere.containere;

console.log(containere.length);

export function generareDrumuriAleatoare(
  numarIndiviziInitiali: number
): number[][] {
  let drumuriAleatoare: number[][] = [];
  for (let i: number = 0; i <= numarIndiviziInitiali; i++) {
    const drum: number[] = [...Array(containere.length).keys()].slice(1);
    shuffle(drum);
    drum.unshift(0);
    drumuriAleatoare.push(drum);
  }

  return drumuriAleatoare;
}

export function getTraseu(ruta: number[]) {
  let traseu = ruta.map((locatie) => ({
    denumire: containere[locatie].denumire,
    latitudine: containere[locatie].latitudine,
    longitudine: containere[locatie].longitudine,
  }));

  traseu.push(traseu[0]);

  return traseu;
}
