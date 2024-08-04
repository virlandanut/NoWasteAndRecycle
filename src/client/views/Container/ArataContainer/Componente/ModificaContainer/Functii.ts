import { FormSDContainer } from "./Interfete";

export const transformaPreturi = (
  preturi: { tip: string; valoare: number }[]
) => {
  const preturiMap: Partial<FormSDContainer> = {};
  preturi.forEach((pret) => {
    switch (pret.tip) {
      case "Zi":
        preturiMap.pretZi = pret.valoare;
        break;
      case "Săptămână":
        preturiMap.pretSaptamana = pret.valoare;
        break;
      case "Lună":
        preturiMap.pretLuna = pret.valoare;
        break;
      case "An":
        preturiMap.pretAn = pret.valoare;
        break;
      default:
        break;
    }
  });
  return preturiMap;
};

export const eliminaAtributeGoale = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== "")
  );
};
