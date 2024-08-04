import { Button } from "@mui/material";
import { PropsButonSubmit } from "./Interfete";

export default function ButonSubmit({
  tailwind,
  varianta = "contained",
  size = "large",
  form,
  text,
  color = "success",
  disabled = false,
}: PropsButonSubmit) {
  return (
    <Button
      disabled={disabled}
      className={tailwind}
      type="submit"
      variant={varianta}
      color={color}
      size={size}
      form={form}>
      {text}
    </Button>
  );
}
