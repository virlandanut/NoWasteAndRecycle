import { Autocomplete, TextField } from "@mui/material";
import { PropsContainer } from "../../../interfaces/Interfete_Frontend";

const tipuri = ["Reciclare", "Depozitare", "Materiale de construcții"];

const TipContainer = ({ register, errors, name, validari }: PropsContainer) => {
  return (
    <Autocomplete
      className="w-full"
      size="small"
      options={tipuri}
      getOptionLabel={(optiune) => optiune}
      renderInput={(params) => (
        <TextField
          {...register(name, validari)}
          error={!!errors.tip}
          color="success"
          name={name}
          {...params}
          label="Tip Container *"
          helperText={errors.tip && errors.tip.message}
        />
      )}
    />
  );
};

export default TipContainer;
