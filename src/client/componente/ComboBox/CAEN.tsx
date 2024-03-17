import { Autocomplete, TextField } from "@mui/material";
import { coduri } from "../../dataset/caen.json";
import { verificareFormFirma } from "../../utils/Validari";
import { PropsFirma } from "../../../../interfaces";

const CAEN: React.FC<PropsFirma> = ({ register, errors, name, validari }) => {
  return (
    <Autocomplete
      className="w-full"
      size="small"
      options={coduri}
      getOptionLabel={(optiune) => String(optiune.cod)}
      renderInput={(params) => (
        <TextField
          {...register(name, validari)}
          error={!!errors.caen}
          color="success"
          name={name}
          {...params}
          label="CAEN"
          helperText={errors.caen && errors.caen.message}
        />
      )}
    />
  );
};

export default CAEN;
