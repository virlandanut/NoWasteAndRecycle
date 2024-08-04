import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSDContainer, ModificaContainerProps } from "./Interfete";
import { ContainerCuPret } from "../../../../../../server/Routes/Container/Interfete";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InputSDContainer } from "./Componente/InputSDContainer";
import { InputSDPreturi } from "./Componente/InputSDPreturi";
import { InputPoza } from "../../../AdaugaContainer/Componente/InputPoza";
import ButonSubmit from "../../../../../componente/Butoane/ButonSubmit";
import { eliminaAtributeGoale } from "./Functii";

export const ModificaContainer: React.FC<ModificaContainerProps> = (props) => {
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    resetField,
    handleSubmit,
  } = useForm<FormSDContainer>();

  const [container, setContainer] = React.useState<ContainerCuPret | null>(
    null
  );
  const [preturiExistente, setPreturiExistente] = React.useState<
    {
      tip: string;
      valoare: number;
    }[]
  >();

  React.useEffect(() => {
    const fetchData = async () => {
      const api: string | undefined = process.env.API_CONTAINER;
      if (!api) {
        props.setNotificare({
          open: true,
          mesaj: "API-ul de obținere a containerului este eronat",
          tip: "eroare",
        });
        return;
      }
      try {
        const raspuns = await fetch(api + `/${props.id}`);
        if (!raspuns.ok) {
          const eroare = await raspuns.json();
          props.setNotificare({
            open: true,
            mesaj: eroare.mesaj,
            tip: "eroare",
          });
          return;
        }
        const data = await raspuns.json();
        setContainer(data);
        const preturi = data.Istoric_pret.map((pret) => {
          return {
            tip: pret.Tip_pret.denumire_tip_pret,
            valoare: pret.pret,
          };
        });
        setPreturiExistente(preturi);
      } catch (eroare) {
        props.setNotificare({
          open: true,
          mesaj: "Containerul nu a putut fi obținut de la server",
          tip: "eroare",
        });
      }
    };
    fetchData();
  }, [props.id]);

  const onSubmit: SubmitHandler<FormSDContainer> = async (
    dataForm: FormSDContainer
  ) => {
    const data = eliminaAtributeGoale({
      id: props.id,
      tip: props.tip,
      ...dataForm,
    });

    try {
      const api: string | undefined = process.env.API_CONTAINER;
      if (!api) {
        props.setNotificare({
          open: true,
          mesaj: "API-ul modificării containerului este eronat",
          tip: "eroare",
        });
        return;
      }
      const raspunsActualizare = await fetch(api, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!raspunsActualizare.ok) {
        const eroare = await raspunsActualizare.json();
        props.setNotificare({
          open: true,
          mesaj: eroare.mesaj,
          tip: "eroare",
        });
        return;
      }
      const dataServer = await raspunsActualizare.json();
      props.setNotificare({
        open: true,
        mesaj: dataServer.mesaj,
        tip: "succes",
      });
      setTimeout(() => {
        props.refresh();
        props.renunta();
        reset();
      }, 1000);
    } catch (eroare) {
      props.setNotificare({
        open: true,
        mesaj: "Datele nu au putut fi trimise către server",
        tip: "eroare",
      });
    }
  };

  return (
    container && (
      <Dialog
        open={props.modificareContainer}
        onClose={props.inchideModificareContainer}>
        <DialogContent sx={{ padding: 0 }}>
          <DialogTitle sx={{ padding: 0 }}>
            <div className="flex gap-2 justify-center items-center px-6 py-4 mt-4">
              <EditIcon color="success" />
              <span className="font-bold uppercase text-green-600">
                Schimbă datele containerului
              </span>
            </div>
          </DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 py-4 px-6">
            <InputSDContainer
              register={register}
              errors={errors}
              label="Denumire container"
              name="denumire"
              validari={{}}
              valoareDefault={container.denumire}
            />
            <InputSDContainer
              register={register}
              errors={errors}
              label="Descriere *"
              name="descriere"
              rows={4}
              validari={{}}
              valoareDefault={container.descriere}
            />
            <InputSDPreturi
              register={register}
              errors={errors}
              preturiInitiale={preturiExistente!}
              resetField={resetField}
            />
            <InputPoza
              setNotificare={props.setNotificare}
              setValue={setValue}
            />
            <section className="flex gap-2">
              <ButonSubmit tailwind="w-1/2" text="Schimbă datele" />
              <Button
                className="w-1/2"
                color="error"
                variant="outlined"
                onClick={props.renunta}>
                Renunțare
              </Button>
            </section>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
};
