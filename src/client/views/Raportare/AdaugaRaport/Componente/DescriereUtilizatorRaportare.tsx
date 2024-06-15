import { useEffect, useState } from "react";
import { Utilizator } from "../../../../../server/Routes/Utilizator/Interfete";
import { Persoana } from "../../../../../server/Routes/Utilizator/Persoana/Interfete";
import { Firma } from "../../../../../server/Routes/Utilizator/Firma/Interfete";

interface UtilizatorCurentPersoana {
  utilizator: Utilizator;
  persoana: Persoana;
  mesaj: string;
}

interface UtilizatorCurentFirma {
  utilizator: Utilizator;
  firma: Firma;
  mesaj: string;
}

const DescriereUtilizatorRaportare = () => {
  const [persoana, setPersoana] = useState<UtilizatorCurentPersoana | null>(
    null
  );
  const [firma, setFirma] = useState<UtilizatorCurentFirma | null>(null);

  useEffect(() => {
    const getUtilizatorCurent = async () => {
      try {
        const raspunsUtilizator = await fetch(
          process.env.API_BASE + "/api/utilizatori/getUtilizator"
        );
        if (!raspunsUtilizator.ok) {
          console.log("Utilizatorul nu a putut fi obținut de la server!");
        }
        const dateUtilizator = await raspunsUtilizator.json();
        if (dateUtilizator.mesaj === "Firma") {
          setFirma(dateUtilizator);
        } else if (dateUtilizator.mesaj === "Persoana") {
          setPersoana(dateUtilizator);
        }
      } catch (eroare) {
        console.log(
          "Au existat probleme la obținerea utilizatorului: ",
          eroare
        );
      }
    };
    getUtilizatorCurent();
  }, []);
  return (
    <section className="pt-4 pr-4 pl-4">
      {persoana && (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-gray-600">
            Bună {persoana.persoana.prenume}, ne cerem scuze dacă ați avut parte
            de o experiență neplăcută în cadrul platformei noastre. Vă rugăm să
            ne descrieți problema cât mai în detaliu iar un coleg va lua
            legătura cu dvs. în cel mai scurt timp
          </p>
        </div>
      )}
      {firma && (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-gray-600">
            Bună {firma.firma.denumire_firma}, ne cerem scuze dacă ați avut
            parte de o experiență neplăcută în cadrul platformei noastre. Vă
            rugăm să ne descrieți problema cât mai în detaliu iar un coleg va
            lua legătura cu dvs. în cel mai scurt timp.
          </p>
        </div>
      )}
    </section>
  );
};

export default DescriereUtilizatorRaportare;
