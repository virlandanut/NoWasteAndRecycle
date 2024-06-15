import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ButonSubmit from "../../../../componente/Butoane/ButonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSDPersoana } from "./Interfete";
import { useEffect, useState } from "react";
import Eroare from "../../../Eroare";
import InputSDPersoana from "./Componente/InputSDPersoana";
import { verificareFormPersoana } from "../../../InregistrareUtilizator/InregistrarePersoana/Validari/Validari";
import { verificareForm } from "../../../InregistrareUtilizator/Validari/Validari";
import Localitati from "../../../../componente/ComboBox/Localitati";
import Notificare from "../../../../componente/Erori/Notificare/Notificare";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete";
import CheckIcon from "@mui/icons-material/Check";

interface CardSchimbareDateContPersoana {
  schimbareDateCont: boolean;
  inchideSchimbareDateCont: () => void;
  renunta: () => void;
}

const SchimbareDatePersoana = ({
  schimbareDateCont,
  inchideSchimbareDateCont,
  renunta,
}: CardSchimbareDateContPersoana) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSDPersoana>();

  const [dateCurentePersoana, setDateCurentePersoana] =
    useState<FormSDPersoana | null>(null);
  const [notificare, setNotificare] = useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  const [succes, setSucces] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  if (dateCurentePersoana) {
    setValue("localitate", dateCurentePersoana.localitate);
  }
  useEffect(() => {
    const getDateCurentePersoana = async () => {
      try {
        const rezultat = await fetch(
          process.env.API_BASE + `/api/utilizatori/persoana/date`
        );
        if (!rezultat.ok) {
          if (rezultat.status === 500) {
            const eroare = await rezultat.json();
            setNotificare({ open: true, mesaj: eroare.mesaj, tip: "eroare" });
          }
        }
        const dateCurente = await rezultat.json();
        setDateCurentePersoana(dateCurente.dateCurentePersoana);
      } catch (eroare) {
        console.log(eroare);
      }
    };
    getDateCurentePersoana();
  }, [succes]);

  const onSubmit: SubmitHandler<FormSDPersoana> = async (
    data: FormSDPersoana
  ) => {
    try {
      const raspunsActualizare = await fetch(
        process.env.API_BASE + "/api/utilizatori/persoana/edit",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      if (raspunsActualizare.status === 500) {
        setFail(true);
      }
      if (raspunsActualizare.status === 200) {
        setFail(false);
        setSucces(true);
        setTimeout(() => {
          renunta();
          reset();
          setSucces(false);
        }, 1000);
      }
    } catch (eroare) {
      console.log(eroare);
    }
  };

  if (dateCurentePersoana === null) {
    return (
      <Eroare
        codEroare={500}
        mesaj="Datele curente ale persoanei nu au putut fi obținute de la server"
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
          <InputSDPersoana
            register={register}
            errors={errors}
            label="Nume de utilizator"
            name="nume_utilizator"
            validari={verificareForm.nume_utilizator}
            valoareDefault={dateCurentePersoana.nume_utilizator}
          />
          <InputSDPersoana
            register={register}
            errors={errors}
            label="Nume"
            name="nume"
            validari={verificareFormPersoana.nume}
            valoareDefault={dateCurentePersoana.nume}
          />
          <InputSDPersoana
            register={register}
            errors={errors}
            label="Prenume"
            name="prenume"
            validari={verificareFormPersoana.prenume}
            valoareDefault={dateCurentePersoana.prenume}
          />
          <InputSDPersoana
            register={register}
            errors={errors}
            label="Telefon"
            name="telefon"
            validari={verificareForm.telefon}
            valoareDefault={dateCurentePersoana.telefon}
          />
          <InputSDPersoana
            register={register}
            errors={errors}
            label="Email"
            name="email"
            validari={verificareForm.email}
            valoareDefault={dateCurentePersoana.email}
          />
          <section className="flex xs: flex-col xs:gap-3 sm:flex-row">
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Strada"
              name="strada"
              validari={verificareForm.strada}
              valoareDefault={dateCurentePersoana.strada}
            />
            <InputSDPersoana
              register={register}
              errors={errors}
              label="Număr"
              name="numar"
              validari={verificareForm.numar}
              valoareDefault={dateCurentePersoana.numar}
            />
          </section>
          <Localitati
            register={register}
            errors={errors}
            name="localitate"
            validari={verificareForm.localitate}
            valoareInitiala={dateCurentePersoana.localitate}
          />
          {succes && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Datele tale au fost modificată cu succes!
            </Alert>
          )}
          {fail && (
            <Alert severity="error">Datele tale nu au fost actualizate</Alert>
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

export default SchimbareDatePersoana;
