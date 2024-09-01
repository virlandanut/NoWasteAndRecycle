export function mutatie(populatie: number[][]): number[][] {
  let mutatii: number[][] = [];
  for (let ruta of populatie) {
    if (Math.random() * 1000 < 9) {
      let index1 = Math.floor(Math.random() * (ruta.length - 1)) + 1;
      let index2 = Math.floor(Math.random() * (ruta.length - 1)) + 1;
      [ruta[index1], ruta[index2]] = [ruta[index2], ruta[index1]];
    }
    mutatii.push(ruta);
  }

  return mutatii;
}
