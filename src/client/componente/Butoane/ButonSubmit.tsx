import { Button } from "@mui/material";

interface PropsButonSubmit {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  text: string;
}

export default function ButonSubmit({
  tailwind,
  varianta = "contained",
  text,
}: PropsButonSubmit) {
  return (
    <Button
      className={tailwind}
      type="submit"
      variant={varianta}
      color="success"
      size="large">
      {text}
    </Button>
  );
}
