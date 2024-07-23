import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  CardInchiriereContainerDepozitareProps,
  CardInchiriereContainerReciclareProps,
} from "../Interfete";

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export const filtreazaContainereReciclare = ({
  containerReciclare,
  filtru,
}: CardInchiriereContainerReciclareProps) => {
  const dataCurenta = dayjs(new Date());

  const containereFiltrate = containerReciclare?.filter((container) => {
    if (filtru === 0) {
      return (
        dataCurenta.isSameOrAfter(dayjs(container.data_inceput), "day") &&
        dataCurenta.isSameOrBefore(dayjs(container.data_sfarsit), "day")
      );
    } else if (filtru === 1) {
      return dayjs(container.data_inceput).isAfter(dataCurenta, "day");
    } else if (filtru === 2) {
      return dayjs(container.data_sfarsit).isBefore(dataCurenta, "day");
    }
  });

  return containereFiltrate;
};

export const filtreazaContainereInchiriere = ({
  containerDepozitare,
  filtru,
}: CardInchiriereContainerDepozitareProps) => {
  const dataCurenta = dayjs(new Date());

  const containereFiltrate = containerDepozitare?.filter((container) => {
    if (filtru === 0) {
      return (
        dataCurenta.isSameOrAfter(dayjs(container.data_inceput), "day") &&
        dataCurenta.isSameOrBefore(dayjs(container.data_sfarsit), "day")
      );
    } else if (filtru === 1) {
      return dayjs(container.data_inceput).isAfter(dataCurenta, "day");
    } else if (filtru === 2) {
      return dayjs(container.data_sfarsit).isBefore(dataCurenta, "day");
    }
  });

  return containereFiltrate;
};
