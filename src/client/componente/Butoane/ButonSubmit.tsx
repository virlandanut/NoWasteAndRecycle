import { Button } from "@mui/material";

interface PropsButonSubmit {
  tailwind?: string;
  varianta?: "contained" | "text" | "outlined";
  text: string;
  color?: "success" | "inherit" | "primary" | "secondary" | "error" | "info" | "warning";
  size?: "small" | "large";
  form?: string;
  disabled?: boolean;
}

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
