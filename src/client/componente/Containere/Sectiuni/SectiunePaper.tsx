import { Paper } from "@mui/material";
import { PropsSectiune } from "../../../../../interfaces";

const SectiunePaper: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return (
    <Paper className={tailwind} variant="elevation" elevation={3}>
      {children}
    </Paper>
  );
};

export default SectiunePaper;
