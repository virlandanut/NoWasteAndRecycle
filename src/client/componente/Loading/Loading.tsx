import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  deschis: boolean;
}

export const Loading = (props: LoadingProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.deschis}>
      <CircularProgress color="success" />
    </Backdrop>
  );
};
