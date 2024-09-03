import {
  calculeazaDistantaCalatorie,
  calculeazaTimpCalatorie,
  functieFitnessDistanta,
} from "./fitness.js";
import { generareDrumuriAleatoare, getTraseu } from "./populatieInitiala.js";
import { crossover } from "./crossover.js";
import { mutatie } from "./mutatie.js";
import { selectiePrinElitism } from "./selectie.js";

export type ContainerPartial = {
  denumire: string;
  latitudine: number;
  longitudine: number;
};

function generarePopulatie(generatieVeche: number[][]): number[][] {
  let supravietuitori: number[][] = selectiePrinElitism(generatieVeche, 0.01);
  let cross: number[][] = crossover(supravietuitori, 0.75);
  let populatieNoua: number[][] = mutatie(cross);

  return populatieNoua;
}

export function generareRutaOptima(
  numarGeneratii: number,
  numarIndiviziInitiali: number
) {
  let generatieCurenta: number[][] = generareDrumuriAleatoare(
    numarIndiviziInitiali
  );

  let generatie = 0;

  while (generatie < numarGeneratii) {
    generatieCurenta = generarePopulatie(generatieCurenta);
    generatie += 1;
  }

  const rutaOptima = generatieCurenta.reduce(
    (prev: number[], current: number[]) =>
      functieFitnessDistanta(prev) > functieFitnessDistanta(current)
        ? prev
        : current
  );

  const traseu = getTraseu(rutaOptima);

  return {
    distantaOptima: calculeazaDistantaCalatorie(rutaOptima) / 1000,
    timpCalatorie: calculeazaTimpCalatorie(rutaOptima),
    traseu,
  };
}
