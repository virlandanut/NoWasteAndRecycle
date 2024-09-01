export function shuffle(array: number[]) {
  for (let i: number = array.length - 1; i > 0; i--) {
    const rand: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
}

export function shuffleArray(array: number[][]) {
  for (let i: number = array.length - 1; i > 0; i--) {
    const rand: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
}

export function calculeazaDistantaCalatorie(
  ruta: number[],
  matriceDistante: number[][]
): number {
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

export function calculeazaTimpCalatorie(
  ruta: number[],
  matriceTimp: number[][]
): string {
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
