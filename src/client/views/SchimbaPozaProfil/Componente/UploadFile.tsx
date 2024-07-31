import React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ButonSubmit from "../../../componente/Butoane/ButonSubmit";
import { InterfataNotificare } from "../../../componente/Erori/Notificare/Interfete";
import Notificare from "../../../componente/Erori/Notificare/Notificare";

export const UploadFile = () => {
  const [previewSource, setPreviewSource] = React.useState<string>("");
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewSource(reader.result.toString());
      }
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const raspuns = await fetch(
        process.env.API_BASE + "/api/utilizatori/upload",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ data: base64EncodedImage }),
        }
      );
      const data = await raspuns.json();
      setNotificare({ open: true, mesaj: data.mesaj, tip: "succes" });
    } catch (eroare) {
      console.log(eroare);
    }
  };
  return (
    <div className=" border-1 gap-4 p-4">
      <form onSubmit={handleSubmitFile} className="flex gap-2" action="">
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          color="success"
          startIcon={<CloudUploadIcon />}>
          Încarcă imagine
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            hidden
          />
        </Button>
        <ButonSubmit text="trimite" />
      </form>
      {previewSource && <img src={previewSource} />}
      <Notificare notificare={notificare} setNotificare={setNotificare} />
    </div>
  );
};
