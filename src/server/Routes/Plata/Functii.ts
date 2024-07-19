import { CalculeazaPretTotalParams, PreturiContainer } from "./Interface.js";

export default function calculeazaPretTotal({
  dataInceput,
  dataSfarsit,
  preturi,
}: CalculeazaPretTotalParams): PreturiContainer {
  if (dataInceput && dataSfarsit && preturi.length > 0) {
    const durataInZile = Math.ceil(
      (dataSfarsit.getTime() - dataInceput.getTime()) / (1000 * 60 * 60 * 24)
    );
    let pretTotal = 0;

    const durataTipPret: { [key: string]: number } = {
      Zi: 1,
      Săptămână: 7,
      Lună: 30,
      An: 365,
    };

    const preturiSortate = preturi.sort(
      (a, b) =>
        durataTipPret[b.Tip_pret.denumire_tip_pret] -
        durataTipPret[a.Tip_pret.denumire_tip_pret]
    );

    let zileRamase = durataInZile === 0 ? 1 : durataInZile;

    preturiSortate.forEach((pret) => {
      const tarif = durataTipPret[pret.Tip_pret.denumire_tip_pret];
      const numarDePerioade = Math.floor(zileRamase / tarif);
      pretTotal += numarDePerioade * pret.pret;
      zileRamase -= numarDePerioade * tarif;
    });

    if (zileRamase > 0) {
      const pretZi = preturi.find(
        (pret) => pret.Tip_pret.denumire_tip_pret === "Zi"
      );
      if (pretZi) {
        pretTotal += zileRamase * pretZi.pret;
      }
    }
    const taxaPlatforma = Math.round(pretTotal * 0.04 * 100) / 100;
    pretTotal = pretTotal * 1.04 * 1.19;
    const pretFinal = Math.round(pretTotal * 100) / 100;
    return { pretFinal, taxaPlatforma };
  }

  return { pretFinal: 0, taxaPlatforma: 0 };
}
