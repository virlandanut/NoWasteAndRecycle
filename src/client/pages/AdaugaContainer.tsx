import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "../../interfaces/Interfete_Frontend";
import { useNavigate } from "react-router-dom";
import InputContainer from "../componente/Input/TextField/InputContainer";
import { Paper } from "@mui/material";
import TipContainer from "../componente/ComboBox/TipContainer";

const AdaugaContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormContainer>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormContainer> = () => console.log("Trimis");
  return (
    <main className="min-w-screen min-h-screen flex justify-center bg-red-500">
      <div className="container w-4/5 bg-[#f8f9fa] flex justify-center gap-12 shadow-sm xs:flex-col md:flex-row p-10">
        <Paper className="w-1/2">
          <form
            className="w-1/2 flex flex-col justify-center gap-3"
            onSubmit={handleSubmit(onSubmit)}>
            <InputContainer
              register={register}
              errors={errors}
              label="Denumire *"
              name="denumire"
              validari={{}}
            />
            <InputContainer
              register={register}
              errors={errors}
              label="Capacitate *"
              name="capacitate"
              validari={{}}
            />
            <TipContainer
              register={register}
              name="tip"
              errors={errors}
              validari={{}}
            />
            <InputContainer
              register={register}
              errors={errors}
              label="Adresă *"
              name="adresa"
              validari={{}}
            />
            <InputContainer
              register={register}
              errors={errors}
              label="Descriere *"
              name="descriere"
              validari={{}}
            />
          </form>
        </Paper>
      </div>
    </main>
  );
};

export default AdaugaContainer;
