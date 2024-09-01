import fs from "fs";

const raspunsAPI = fs.readFileSync(
  "src/server/Utils/GA/raspunsApi.json",
  "utf-8"
);
const api = JSON.parse(raspunsAPI);
const matriceDistante: number[][] = api.distances;
const matriceTimp: number[][] = api.durations;

export function functieFitnessDistanta(ruta: number[]): number {
  const distante: number[] = [];
  for (let i: number = 0; i < ruta.length; i++) {
    let indexCurent = ruta[i];
    let indexUrmator = i !== ruta.length - 1 ? ruta[i + 1] : ruta[0];

    distante.push(matriceDistante[indexCurent][indexUrmator]);
  }

  const distantaTotala: number = distante.reduce(
    (curent: number, anterior: number) => curent + anterior,
    0
  );

  return 1 / distantaTotala;
}

export function calculeazaDistantaCalatorie(ruta: number[]): number {
  const distante: number[] = [];
  for (let i: number = 0; i < ruta.length; i++) {
    let indexCurent = ruta[i];
    let indexUrmator = i !== ruta.length - 1 ? ruta[i + 1] : ruta[0];

    distante.push(matriceDistante[indexCurent][indexUrmator]);
  }

  return distante.reduce(
    (curent: number, anterior: number) => curent + anterior,
    0
  );
}

export function calculeazaTimpCalatorie(ruta: number[]): string {
  const secundeCalatorie: number[] = [];
  for (let i: number = 0; i < ruta.length; i++) {
    let indexCurent = ruta[i];
    let indexUrmator = i !== ruta.length - 1 ? ruta[i + 1] : ruta[0];

    secundeCalatorie.push(matriceTimp[indexCurent][indexUrmator]);
  }

  let secundeTotale: number = secundeCalatorie.reduce(
    (current, previous) => current + previous,
    0
  );

  const timp: string = new Date(secundeTotale * 1000)
    .toISOString()
    .slice(11, 19);

  return timp;
}
