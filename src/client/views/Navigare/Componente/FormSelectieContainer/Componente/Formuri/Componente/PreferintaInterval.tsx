import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { FormSelectieReciclare } from "../Reciclare/Interfete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InterfataNotificare } from "../../../../../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../../../../../componente/Erori/Notificare/Notificare";
import InputSelectieReciclare from "../Reciclare/Componente/InputSelectie";
import { verificareFormSelectieReciclare } from "../Reciclare/Componente/Validari";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

interface PreferinteIntervalProps {
  register: UseFormRegister<FormSelectieReciclare>;
  errors: FieldErrors<FormSelectieReciclare>;
  setValue: UseFormSetValue<FormSelectieReciclare>;
}

const PreferintaInterval: React.FC<PreferinteIntervalProps> = ({
  register,
  errors,
  setValue,
}) => {
  const [dataInceput, setDataInceput] = React.useState<Dayjs | null>(null);
  const [dataSfarsit, setDataSfarsit] = React.useState<Dayjs | null>(null);
  const [bifat, setBifat] = React.useState<boolean>(false);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const handleDataInceput = (date: Dayjs | null) => {
    setValue("data_inceput", date);
    setDataInceput(date);
  };

  const handleDataSfarsit = (date: Dayjs | null) => {
    setValue("data_sfarsit", date);
    setDataSfarsit(date);
  };

  const handleBifat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBifat(event.target.checked);
    setValue("bugetPrioritar", event.target.checked);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className="flex flex-col gap-4">
        <div className="flex gap-2">
          <DatePicker
            minDate={dayjs()}
            className="w-1/2"
            slotProps={{
              textField: {
                ...register(
                  "data_inceput",
                  verificareFormSelectieReciclare.data_inceput
                ),
                size: "small",
                color: "success",
                error: Boolean(errors.data_inceput),
                helperText: errors.data_inceput?.message,
              },
            }}
            label={dataInceput ? "Dată început" : "Dată început (opțional)"}
            onChange={handleDataInceput}
            disablePast
          />
          <DatePicker
            disabled={dataInceput === null}
            minDate={dataInceput!}
            className="w-1/2"
            slotProps={{
              textField: {
                ...register(
                  "data_sfarsit",
                  verificareFormSelectieReciclare.data_sfarsit
                ),
                size: "small",
                color: "success",
                error: Boolean(errors.data_sfarsit),
                helperText: errors.data_sfarsit?.message,
              },
            }}
            label={dataInceput ? "Dată sfârșit *" : "Dată sfârșit (opțional)"}
            onChange={handleDataSfarsit}
            disablePast
          />
        </div>
        <InputSelectieReciclare
          disabled={!Boolean(dataInceput && dataSfarsit)}
          register={register}
          errors={errors}
          label={dataInceput ? "Buget (RON) *" : "Buget (Opțional)"}
          name="buget"
          validare={verificareFormSelectieReciclare.buget}
        />
        <div className="flex flex-col">
          <FormControlLabel
            control={
              <Checkbox
                disabled={!Boolean(dataInceput && dataSfarsit)}
                size="small"
                checked={bifat}
                onChange={handleBifat}
                color="success"
              />
            }
            label={
              <h3 className="text-gray-600">Vreau cel mai ieftin container</h3>
            }
          />
          {bifat && (
            <span className="text-xs italic text-gray-500">
              * Dacă selectați această opțiune distanța nu va mai fi luată în
              calcul în momentul în care se va face selecția containerului. În
              schimb selecția va asigura containerul cel mai ieftin raportat la
              bugetul dvs.
            </span>
          )}
        </div>
        <Notificare notificare={notificare} setNotificare={setNotificare} />
      </section>
    </LocalizationProvider>
  );
};

export default PreferintaInterval;
