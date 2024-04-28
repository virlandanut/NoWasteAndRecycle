import { Button } from "@mui/material";

interface PropsButonSubmit {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  text: string;
  size?: "small" | "large";
}

export default function ButonSubmit({
  tailwind,
  varianta = "contained",
  size = "large",
  text,
}: PropsButonSubmit) {
  return (
    <Button
      className={tailwind}
      type="submit"
      variant={varianta}
      color="success"
      size={size}>
      {text}
    </Button>
  );
}
