import { Dayjs } from "dayjs";
import { PretContainer } from "../../../../server/Routes/Container/Interfete";
import { Perioade } from "./Interfete";

export const generateDateRange = (start: Dayjs, end: Dayjs): Dayjs[] => {
  const dates: Dayjs[] = [];
  let current = start.startOf("day");
  while (current.isBefore(end, "day")) {
    dates.push(current);
    current = current.add(1, "day");
  }

  return dates;
};

export const checkDisabledDatesInRange = (
  start: Dayjs,
  end: Dayjs,
  disabledDates: Dayjs[]
): boolean => {
  const datesInRange = generateDateRange(start, end);
  return datesInRange.some((date) =>
    disabledDates.some((disabledDate) => date.isSame(disabledDate, "day"))
  );
};

export const calculeazaPretTotal = (
  dataInceput: Dayjs | null,
  dataSfarsit: Dayjs | null,
  preturi: PretContainer[],
  setPretFaraTaxa: (pret: number) => void,
  setPerioade: (perioade: Perioade) => void
) => {
  if (dataInceput && dataSfarsit && preturi.length > 0) {
    const durataInZile = dataSfarsit.diff(dataInceput, "day");
    let pretTotal = 0;

    const durataTipPret: { [key: string]: number } = {
      Zi: 1,
      Săptămână: 7,
      Lună: 30,
      An: 365,
    };

    const preturiSortate = preturi.sort(
      (a, b) =>
        durataTipPret[b.denumire_tip_pret] - durataTipPret[a.denumire_tip_pret]
    );

    let zileRamase: number;
    if (durataInZile === 0) {
      zileRamase = 1;
    } else {
      zileRamase = durataInZile;
    }

    const obiectPerioade: Perioade = {};

    preturiSortate.forEach((pret) => {
      const tarif = durataTipPret[pret.denumire_tip_pret];
      const numarDePerioade = Math.floor(zileRamase / tarif);
      pretTotal += numarDePerioade * pret.pret;
      zileRamase -= numarDePerioade * tarif;
      obiectPerioade[pret.denumire_tip_pret] = numarDePerioade;
    });

    pretTotal += zileRamase * durataTipPret["Zi"];

    setPretFaraTaxa(pretTotal);
    setPerioade(obiectPerioade);
  }
};
