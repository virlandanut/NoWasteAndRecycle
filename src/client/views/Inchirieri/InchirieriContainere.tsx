import React from 'react'
import { ContextUtilizatorCurent } from '../../componente/Erori/RutaProtejata';
import { InterfataNotificare } from '../../componente/Erori/Notificare/Interfete';
import Notificare from '../../componente/Erori/Notificare/Notificare';
import { useParams } from 'react-router-dom';
import { Inchirieri } from '../../../server/Routes/Utilizator/Interfete';
import CardInchiriereContainerReciclare from './Componente/CardInchiriereContainerReciclare';

const InchirieriContainere = () => {
    const { nume_utilizator } = useParams();
    const [containereInchiriate, setContainereInchirieri] = React.useState<Inchirieri | null>(null);
    const [notificare, setNotificare] = React.useState<InterfataNotificare>({
        open: false,
        mesaj: "",
        tip: "",
    });

    React.useEffect(() => {

        const api: string | undefined = process.env.API_UTILIZATOR;

        if (!api) {
            setNotificare({ open: true, mesaj: "API-ul închirierilor este eronat", tip: "eroare" });
            return;
        }

        const fetchInchirieri = async (nume_utilizator: string) => {

            try {
                const raspuns = await fetch(api + `${nume_utilizator}/inchirieri`);
                if (!raspuns.ok) {
                    setNotificare({ open: true, mesaj: `Închirierile utilizatorului ${nume_utilizator} nu au putut fi obținute de la server`, tip: "eroare" });
                    return;
                }

                const data = await raspuns.json();
                setContainereInchirieri(data);

            } catch (eroare) {

                setNotificare({ open: true, mesaj: `Închirierile utilizatorului ${nume_utilizator} nu au putut fi obținute de la server`, tip: "eroare" });
                return;
            }

        }

        if (!nume_utilizator) {
            setNotificare({ open: true, mesaj: `Numele de utilizator nu există`, tip: "eroare" });
            return;
        }
        fetchInchirieri(nume_utilizator);
    }, [nume_utilizator])

    return (
        <main className="min-w-screen min-h-screen flex justify-center">
            <div className="w-2/3 bg-[#f8f9fa] flex-col items-start gap-5 shadow-sm xs:flex-col xs:w-3/4 sm:flex-col sm:w-3/4 md:flex-col md:w-3/4 lg:flex-row lg:w-2/3 p-10">
                <CardInchiriereContainerReciclare containerReciclare={containereInchiriate?.containereReciclare} />
                <Notificare notificare={notificare} setNotificare={setNotificare} />

            </div>
        </main>
    )
}

export default InchirieriContainere;