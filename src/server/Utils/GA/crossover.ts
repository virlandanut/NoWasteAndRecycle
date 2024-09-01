export function crossover(
  supravietuitori: number[][],
  rataCrossover: number
): number[][] {
  let urmasi: number[][] = [];
  let parinti: number[][] = [];

  for (let i: number = 0; i < supravietuitori.length; i++) {
    let random: number = Math.random();
    if (random < rataCrossover) {
      parinti.push(supravietuitori[i]);
    } else {
      urmasi.push(supravietuitori[i]);
    }
  }

  if (parinti.length % 2 !== 0) {
    const ultimulParinte = parinti.pop();
    urmasi.push(ultimulParinte!);
  }

  for (let i: number = 0; i < parinti.length; i += 2) {
    let parinteA: number[] = parinti[i];
    let parinteB: number[] = parinti[i + 1];

    let [urmasA, urmasB] = reproducere(parinteA, parinteB);
    urmasi.push(urmasA);
    urmasi.push(urmasB);
  }
  return urmasi;
}

export function reproducere(parinteA: number[], parinteB: number[]) {
  const marime: number = parinteA.length;

  const [indexStart, indexFinal] = generareIndici(marime);
  const urmasA = creeazaUrmas(parinteA, parinteB, indexStart, indexFinal);
  const urmasB = creeazaUrmas(parinteB, parinteA, indexStart, indexFinal);

  return [urmasA, urmasB];
}

function generareIndici(marime: number): [number, number] {
  let indexStart: number;
  let indexFinal: number;
  do {
    indexStart = Math.floor(Math.random() * (marime - 1)) + 1;
    indexFinal = Math.floor(Math.random() * (marime - indexStart)) + indexStart;
  } while (indexStart === indexFinal);

  return [indexStart, indexFinal];
}

function creeazaUrmas(
  parinte1: number[],
  parinte2: number[],
  indexStart: number,
  indexFinal: number
): number[] {
  const genaParinte1 = parinte1.slice(indexStart, indexFinal);
  const genaParinte2 = parinte2.filter(
    (gena) => !genaParinte1.includes(gena) && gena !== 0
  );

  const urmas: number[] = [0];
  for (let i: number = 1; i < parinte1.length; i++) {
    if (i >= indexStart && i < indexFinal) {
      urmas.push(genaParinte1.shift()!);
    } else {
      urmas.push(genaParinte2.shift()!);
    }
  }

  return urmas;
}
