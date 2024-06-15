import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Eroare from "../../Eroare";
import { Divider, Snackbar, SnackbarContent } from "@mui/material";
import AdaugaComentariu from "./Componente/AdaugaComentariu/AdaugaComentariu";
import ArataComentarii from "./Componente/ArataComentarii/ArataComentarii";
import { EroareRaportShow, TichetRaport, UtilizatorCurent } from "./Interfete";
import OptiuniTichet from "./Componente/OptiuniTichet/OptiuniTichet";
import InformatiiTichet from "./Componente/InformatiiTichet/InformatiiTichet";
import { Notificare } from "./Componente/AdaugaComentariu/Interfete";

export const ContextUtilizatorCurent = createContext<UtilizatorCurent | null>(
  null
);

const RaportShow = () => {
  const { id } = useParams();
  const [raport, setRaport] = useState<TichetRaport>();
  const [eroare, setEroare] = useState<EroareRaportShow>();
  const navigate = useNavigate();
  const [refreshComentarii, setRefreshComentarii] = useState<boolean>(false);
  const [refreshInformatii, setRefreshInformatii] = useState<boolean>(false);
  const [notificare, setNotificare] = useState<Notificare>({
    open: false,
    mesaj: "",
    culoare: "",
  });
  const [utilizatorCurent, setUtilizatorCurent] =
    useState<UtilizatorCurent | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const raspuns = await fetch(process.env.API_BASE + `/api/raport/${id}`);
        if (!raspuns.ok) {
          const eroare = await raspuns.json();
          setEroare({ eroare: raspuns.status, mesaj: eroare.mesaj });
          if (raspuns.status === 403) {
            navigate(-1);
          }
        }
        const data: TichetRaport = await raspuns.json();
        setRaport(data);
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getIdRolUtilizatorCurent"
        );
        if (!raspunsUtilizator.ok) {
          setNotificare({
            open: true,
            mesaj: "Utilizatorul curent nu a putut fi obținut de la server",
            culoare: "#ef5350",
          });
        }
        const dateUtilizator: UtilizatorCurent = await raspunsUtilizator.json();
        setUtilizatorCurent(dateUtilizator);
      } catch (eroare) {
        console.log("Eroare fetch data în componenta RaportShow: ", eroare);
        setEroare({
          eroare: 400,
          mesaj:
            "Au existat probleme la interogarea raportului din baza de date!",
        });
      }
    };
    fetchData();
  }, [id, refreshInformatii]);

  if (eroare) {
    return <Eroare codEroare={eroare.eroare} mesaj={eroare.mesaj} />;
  }

  return (
    <ContextUtilizatorCurent.Provider value={utilizatorCurent}>
      {raport && utilizatorCurent && (
        <main className="min-w-screen min-h-screen flex justify-center">
          <div className="w-2/3 p-10 flex">
            <section className="flex flex-col gap-8 w-1/5">
              <InformatiiTichet tichet={raport.tichet} />
            </section>
            <div className="w-4/5 flex flex-col gap-6">
              <section>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between gap-2">
                    <h1 className="text-2xl font-bold">
                      {raport.tichet.titlu}
                    </h1>

                    {utilizatorCurent.rol === "administrator" && (
                      <OptiuniTichet
                        id_tichet={raport.tichet.id_raport_problema}
                        status={raport.tichet.status}
                        setRefreshInformatii={() =>
                          setRefreshInformatii(!refreshInformatii)
                        }
                        setNotificare={setNotificare}
                      />
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{raport.tichet.mesaj}</p>
                  <Divider />
                </div>
              </section>
              <section>
                <ArataComentarii
                  id_raportare_problema={raport.tichet.id_raport_problema}
                  id_proprietar={raport.tichet.utilizator}
                  reRandeaza={refreshComentarii}
                />
              </section>
              <Divider />
              <section>
                {raport.tichet.status === 0 ? (
                  <AdaugaComentariu
                    id_raport_problema={raport.tichet.id_raport_problema}
                    setRandeazaDinNou={() =>
                      setRefreshComentarii(!refreshComentarii)
                    }
                  />
                ) : (
                  <p className="text-gray-500 text-lg text-center">
                    Acest tichet a fost marcat ca{" "}
                    <span className="text-green-600 font-bold uppercase">
                      rezolvat
                    </span>{" "}
                    de către un administrator. Dacă aveți nelămuriri vă rugăm să
                    creați un nou tichet!
                  </p>
                )}
              </section>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() =>
              setNotificare({ open: false, mesaj: "", culoare: "" })
            }
            open={notificare.open}
            autoHideDuration={2500}>
            <SnackbarContent
              style={{ backgroundColor: notificare.culoare }}
              message={
                <span className="font-semibold">{notificare.mesaj}</span>
              }
            />
          </Snackbar>
        </main>
      )}
    </ContextUtilizatorCurent.Provider>
  );
};

export default RaportShow;
