import React from "react";
import { InterfataNotificare } from "../../../../componente/Erori/Notificare/Interfete";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface InputPozaProps {
  setValue: any;
  setNotificare: (notificare: InterfataNotificare) => void;
}

export const InputPoza: React.FC<InputPozaProps> = (props) => {
  const [imagine, setImagine] = React.useState<string>("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    } else {
      props.setNotificare({
        open: true,
        mesaj: "Vă rugăm să încărcați doar imagini",
        tip: "eroare",
      });
    }
  };

  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setImagine(reader.result.toString());
        props.setValue("poza", reader.result.toString());
      }
    };
  };

  const resetImagine = () => {
    setImagine("");
    props.setValue("poza", "");
  };

  return (
    <div className="flex">
      <Button
        className="self-start"
        component="label"
        role={undefined}
        tabIndex={-1}
        color={imagine ? "success" : "inherit"}
        startIcon={<CloudUploadIcon />}>
        {imagine ? "Imagine încărcată" : "Încarcă imagine"}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileInputChange}
          hidden
        />
      </Button>
      {imagine && (
        <Button
          style={{ textTransform: "none" }}
          color="error"
          onClick={resetImagine}>
          Șterge imagine
        </Button>
      )}
    </div>
  );
};
