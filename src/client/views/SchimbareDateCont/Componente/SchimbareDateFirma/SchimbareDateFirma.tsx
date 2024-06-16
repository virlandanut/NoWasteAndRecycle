import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ButonSubmit from "../../../../componente/Butoane/ButonSubmit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete";
import CheckIcon from "@mui/icons-material/Check";
import Notificare from "../../../../componente/Erori/Notificare/Notificare";
import InputSDFirma from "./Componente/InputSDFirma";
import { verificareForm } from "../SchimbareDatePersoana/Validari";
import Eroare from "../../../Eroare";
import { verificareFormFirma } from "../../../InregistrareUtilizator/InregistrareFirma/Validari/Validari";
import Localitati from "../../../../componente/ComboBox/Localitati";
import { FormSDFirma } from "./Interfete";

interface CardSchimbareDateContFirma {
  schimbareDateCont: boolean;
  inchideSchimbareDateCont: () => void;
  renunta: () => void;
}

const SchimbareDateFirma = ({
  schimbareDateCont,
  inchideSchimbareDateCont,
  renunta,
}: CardSchimbareDateContFirma) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSDFirma>();

  const [dateCurenteFirma, setDateCurenteFirma] = useState<FormSDFirma | null>(
    null
  );

  const [notificare, setNotificare] = useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const [succes, setSucces] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  if (dateCurenteFirma) {
    setValue("localitate", dateCurenteFirma.localitate);
  }

  useEffect(() => {
    const getDateCurenteFirma = async () => {
      try {
        const rezultat = await fetch(
          process.env.API_BASE + `/api/utilizatori/firma/date`
        );
        if (!rezultat.ok) {
          if (rezultat.status === 500) {
            const eroare = await rezultat.json();
            setNotificare({ open: true, mesaj: eroare.mesaj, tip: "eroare" });
          }
        }
        const dateCurente = await rezultat.json();
        setDateCurenteFirma(dateCurente.dateCurenteFirma);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj: "Au existat probleme la obținerea datelor curente",
          tip: "eroare",
        });
      }
    };
    getDateCurenteFirma();
  }, [succes]);

  const onSubmit: SubmitHandler<FormSDFirma> = async (data: FormSDFirma) => {
    try {
      const raspunsActualizare = await fetch(
        process.env.API_BASE + `/api/utilizatori/firma/edit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (!raspunsActualizare.ok) {
        const eroare = await raspunsActualizare.json();
        setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
      }
      if (raspunsActualizare.status === 200) {
        setSucces(true);
        setTimeout(() => {
          setSucces(false);
          reset();
          renunta();
        }, 1000);
      }
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: "Datele nu au putut fi trimise către server",
        tip: "eroare",
      });
    }
  };

  if (dateCurenteFirma === null) {
    return (
      <Eroare
        codEroare={500}
        mesaj="Datele curente ale firmei nu au putut fi obținute de la server"
      />
    );
  }

  return (
    <Dialog open={schimbareDateCont} onClose={inchideSchimbareDateCont}>
      <DialogContent sx={{ padding: 0 }}>
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2 mt-4">
            <ManageAccountsIcon color="success" />
            <span className="font-bold uppercase text-green-600">
              Schimbă datele contului
            </span>
          </div>
        </DialogTitle>
        <form
          className="w-full flex flex-col gap-3 p-4"
          onSubmit={handleSubmit(onSubmit)}>
          <InputSDFirma
            register={register}
            errors={errors}
            label="Denumire firmă"
            name="nume_utilizator"
            validari={verificareForm.nume_utilizator}
            valoareDefault={dateCurenteFirma.nume_utilizator}
          />
          <InputSDFirma
            register={register}
            errors={errors}
            label="Denumire firmă"
            name="denumire_firma"
            validari={verificareFormFirma.denumire_firma}
            valoareDefault={dateCurenteFirma.denumire_firma}
          />
          <InputSDFirma
            register={register}
            errors={errors}
            label="Telefon"
            name="telefon"
            validari={verificareForm.telefon}
            valoareDefault={dateCurenteFirma.telefon}
          />
          <InputSDFirma
            register={register}
            errors={errors}
            label="Email"
            name="email"
            validari={verificareForm.email}
            valoareDefault={dateCurenteFirma.email}
          />
          <section className="flex xs:flex-col xs:gap-3 sm:flex-row">
            <InputSDFirma
              register={register}
              errors={errors}
              label="Strada"
              name="strada"
              validari={verificareForm.strada}
              valoareDefault={dateCurenteFirma.strada}
            />
            <InputSDFirma
              register={register}
              errors={errors}
              label="Număr"
              name="numar"
              validari={verificareForm.numar}
              valoareDefault={dateCurenteFirma.numar}
            />
          </section>
          <Localitati
            register={register}
            errors={errors}
            name="localitate"
            validari={verificareForm.localitate}
            valoareInitiala={dateCurenteFirma.localitate}
          />
          {succes && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Datele tale au fost modificată cu succes!
            </Alert>
          )}
          <section className="flex gap-2">
            <ButonSubmit tailwind="w-1/2" text="Schimbă datele" />
            <Button
              className="w-1/2"
              color="error"
              variant="outlined"
              onClick={renunta}>
              Renunțare
            </Button>
          </section>
        </form>
      </DialogContent>
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </Dialog>
  );
};

export default SchimbareDateFirma;
