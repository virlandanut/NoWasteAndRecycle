import { parseISO, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const formatareData = (data: string): string => {
  const zona = "Europe/Bucharest";
  const dataZona = utcToZonedTime(parseISO(data), zona);
  return format(dataZona, "dd.MM.yyyy HH:mm");
};
