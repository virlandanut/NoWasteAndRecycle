export const setareValoriNeselectate = (
  obiect: Object,
  valoareImplicita: string
): Object => {
  const rezultat: Object = {};
  for (const cheie in obiect) {
    if (obiect.hasOwnProperty(cheie)) {
      if (obiect[cheie] === undefined || obiect[cheie] === "") {
        rezultat[cheie] = valoareImplicita;
      } else {
        rezultat[cheie] = obiect[cheie];
      }
    }
  }

  return rezultat;
};
