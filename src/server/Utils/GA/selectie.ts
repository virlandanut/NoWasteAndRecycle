import { functieFitnessDistanta } from "./fitness.js";
import { shuffleArray } from "./functiiAjutatoare.js";

export function selectiePrinElitism(
  generatieTrecuta: number[][],
  procentElitism: number
) {
  const numarElite = Math.floor(procentElitism * generatieTrecuta.length);
  generatieTrecuta.sort(
    (a, b) => functieFitnessDistanta(b) - functieFitnessDistanta(a)
  );

  const elita = generatieTrecuta.slice(0, numarElite);

  let supravietuitori = elita;
  let turneu = selectieSupravietuitoriTurneu(
    generatieTrecuta.slice(numarElite)
  );

  return supravietuitori.concat(turneu);
}

function selectieSupravietuitoriTurneu(
  generatieTrecuta: number[][]
): number[][] {
  const populatie: number[][] = [...generatieTrecuta];
  shuffleArray(populatie);

  let supravietuitori: number[][] = [];

  for (let i: number = 0; i < populatie.length; i++) {
    let index1 = Math.floor(Math.random() * populatie.length);
    let index2 = Math.floor(Math.random() * populatie.length);

    if (
      functieFitnessDistanta(populatie[index1]) >
      functieFitnessDistanta(populatie[index2])
    ) {
      supravietuitori.push(populatie[index1]);
    } else {
      supravietuitori.push(populatie[index2]);
    }
  }

  return supravietuitori;
}
