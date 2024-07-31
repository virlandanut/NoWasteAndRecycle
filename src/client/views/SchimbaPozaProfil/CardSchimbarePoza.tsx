import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { InterfataNotificare } from "../../componente/Erori/Notificare/Interfete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ButonSubmit from "../../componente/Butoane/ButonSubmit";
import Notificare from "../../componente/Erori/Notificare/Notificare";
import { Loading } from "../../componente/Loading/Loading";
import { Utilizator } from "@prisma/client";

interface CardSchimbarePozaProps {
  schimbarePoza: boolean;
  inchideSchimbarePoza: () => void;
  renunta: () => void;
  setUtilizatorCurent: (utilizator: Utilizator) => void;
}

export const CardSchimbarePoza = (props: CardSchimbarePozaProps) => {
  const [previewSource, setPreviewSource] = React.useState<string>("");
  const [succes, setSucces] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [notificare, setNotificare] = React.useState<InterfataNotificare>({
    open: false,
    mesaj: "",
    tip: "",
  });

  React.useEffect(() => {
    const fetchUtilizator = async () => {
      try {
        const api: string | undefined = process.env.API_GET_UTILIZATOR_CURENT;
        if (!api) {
          setNotificare({
            open: true,
            mesaj: "API-ul utilizatorului curent este eronat",
            tip: "eroare",
          });
          return;
        }
        const raspuns = await fetch(api);
        if (!raspuns.ok) {
          const eroare = await raspuns.json();
          setNotificare({
            open: true,
            mesaj: eroare.mesaj,
            tip: "eroare",
          });
          return;
        }
        const date = await raspuns.json();
        props.setUtilizatorCurent(date);
      } catch (eroare) {
        setNotificare({
          open: true,
          mesaj: "Utilizatorul curent nu a putut fi actualizat",
          tip: "eroare",
        });
      }
    };
    fetchUtilizator();
  }, [succes]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      previewFile(file);
    } else {
      setNotificare({
        open: true,
        mesaj: "Vă rugăm să încărcați doar imagini",
        tip: "eroare",
      });
    }
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
    setLoading(true);
    if (!previewSource) {
      setNotificare({
        open: true,
        mesaj: "Imaginea nu a fost selectată",
        tip: "eroare",
      });
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
      if (!raspuns.ok) {
        const data = await raspuns.json();
        setNotificare({ open: true, mesaj: data.mesaj, tip: "eroare" });
        return;
      }
      const data = await raspuns.json();
      setLoading(false);
      setNotificare({ open: true, mesaj: data.mesaj, tip: "succes" });
      setSucces((v) => !v);
      setTimeout(() => {
        props.renunta();
        setNotificare({ open: false, mesaj: "", tip: "" });
      }, 2000);
      setPreviewSource("");
    } catch (eroare) {
      setNotificare({
        open: true,
        mesaj: (eroare as Error).message,
        tip: "eroare",
      });
    }
  };
  return (
    <Dialog open={props.schimbarePoza} onClose={props.inchideSchimbarePoza}>
      <DialogContent sx={{ padding: 0 }}>
        <DialogTitle sx={{ padding: 0 }}>
          <div className="flex gap-2 justify-center items-center p-2 mt-4">
            <ImageRoundedIcon color="success" />
            <span className="font-bold uppercase text-green-600">
              Schimbă poza de profil
            </span>
          </div>
        </DialogTitle>
        <div className="flex flex-col items-center border gap-4 p-4">
          {previewSource && (
            <img className="w-80 object-contain" src={previewSource} />
          )}
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
                accept="image/*"
                onChange={handleFileInputChange}
                hidden
              />
            </Button>
            <ButonSubmit text="trimite" />
          </form>
          <Notificare notificare={notificare} setNotificare={setNotificare} />
          <Loading deschis={loading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
