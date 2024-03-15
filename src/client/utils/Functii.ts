export const validareCIF = (valoare: string) => {
  const cheie = "753217532";
  if (typeof valoare !== "string") {
    return false;
  }
  let cif = valoare.toUpperCase();
  cif = cif.indexOf("RO") > -1 ? cif.substring(2) : cif;
  cif = cif.replace(/\s/g, "");
  if (cif.length < 2 || cif.length > 10) {
    return false;
  }
  if (Number.isNaN(parseInt(cif))) {
    return false;
  }

  const numarControl = parseInt(cif.substring(cif.length - 1));
  cif = cif.substring(0, cif.length - 1);

  while (cif.length !== cheie.length) {
    cif = "0" + cif;
  }

  let suma = 0;
  let i = cif.length;

  while (i--) {
    suma += parseInt(cif.charAt(i)) * parseInt(cheie.charAt(i));
  }

  let calculareNumarControl = (suma * 10) % 11;

  if (calculareNumarControl === 10) {
    calculareNumarControl = 0;
  }

  return numarControl === calculareNumarControl;
};
