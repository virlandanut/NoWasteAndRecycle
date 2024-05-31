import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import InputRaportare from "../../Input/TextField/InputRaportare";
import Mesaj from "../../Input/TextArea/Mesaj";
import ButonSubmit from "../../Butoane/ButonSubmit";
import Dialog from "@mui/material/Dialog";
import DescriereUtilizatorRaportare from "./DescriereUtilizatorRaportare";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";

const verificareFormRaport = {
  titlu: {
    required: "Titlul este obligatoriu",
    //minLength: { value: 8, message: "Minim 8 caractere" },
    //maxLength: { value: 20, message: "Maxim 20 de caractere" },
  },
  mesaj: {
    required: "Descrierea este obligatorie",
    //minLength: { value: 8, message: "Minim 8 caractere" },
    //maxLength: { value: 20, message: "Maxim 20 de caractere" },
  },
};

interface FormTichet {
  titlu: string;
  mesaj: string;
}

interface CardRaportareProps {
  renunta: () => void;
  raportare: boolean;
  inchideRaport: () => void;
}

const CardRaportare = ({
  renunta,
  raportare,
  inchideRaport,
}: CardRaportareProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTichet>();

  const onSubmit = (data: FormTichet): void => {
    console.log(data);
  };
  return (
    <Dialog open={raportare} onClose={inchideRaport}>
      <DialogContent
        sx={{ padding: 0 }}
        className="flex flex-col mt-4 w-[500px]">
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2">
            <NewReleasesRoundedIcon color="error" />
            <span className="font-bold uppercase text-red-600">
              Trimite un tichet
            </span>
          </div>
        </DialogTitle>
        <DescriereUtilizatorRaportare />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4">
          <InputRaportare
            register={register}
            errors={errors}
            name="titlu"
            validari={verificareFormRaport.titlu}
            label="Subiect"
          />
          <Mesaj
            register={register}
            errors={errors}
            name="mesaj"
            validari={verificareFormRaport.mesaj}
            label="Descriere"
          />
          <div className="w-full flex gap-4">
            <ButonSubmit tailwind={"w-1/2"} text="Trimite" />
            <Button
              className="w-1/2"
              color="error"
              variant="outlined"
              onClick={renunta}>
              Renunțare
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CardRaportare;
