import { Firma, Localitate, Persoana_fizica, Utilizator } from '@prisma/client'
import React from 'react'

interface DescriereUtilizatorProps {
    utilizatorCurent: Utilizator | null;
    persoanaCurenta: Persoana_fizica | null;
    firmaCurenta: Firma | null;
}

const DescriereUtilizator: React.FC<DescriereUtilizatorProps> = ({ utilizatorCurent, persoanaCurenta, firmaCurenta }) => {

    const [localitate, setLocalitate] = React.useState<Localitate | null>(null);

    React.useEffect(() => {
        const getLocalitate = async (id: number) => {
            try {
                const api = process.env.API_GET_LOCALITATI;
                if (!api) {
                    console.log("API-ul localităților nu există");
                    return
                }
                const raspuns = await fetch(process.env.API_GET_LOCALITATI + `/${id}`);
                if (!raspuns.ok) {
                    console.log("Localitatea nu a putut fi obținută de la server");
                }
                const data = await raspuns.json();
                setLocalitate(data);
            } catch (eroare) {
                console.log("Localitatea nu a putut fi obținută de la server");
            }
        }
        if (utilizatorCurent) {
            getLocalitate(utilizatorCurent.localitate);
        }
    }, [utilizatorCurent])
    return (
        <section>
            {utilizatorCurent && persoanaCurenta && (
                <div className="mt-2">
                    <h2>
                        <span className="text-gray-600 font-semibold">Nume: </span>
                        <span className="text-gray-500">{`${persoanaCurenta.nume} ${persoanaCurenta.prenume}`}</span>
                    </h2>
                    <h2>
                        <span className="text-gray-600 font-semibold">Rol: </span>
                        <span className="text-gray-500 uppercase">
                            {utilizatorCurent.rol}
                        </span>
                    </h2>
                    <h2>
                        <span className="text-gray-600 font-semibold">
                            Adresă:{" "}
                        </span>{" "}
                        <span className="text-gray-500">{`Str. ${utilizatorCurent.strada}, Nr. ${utilizatorCurent.numar}, ${localitate ? localitate.denumire_localitate : ""}, Constanța`}</span>
                    </h2>
                    <h2>
                        <span className="text-gray-600 font-semibold">Email: </span>{" "}
                        <span className="text-gray-500">{`${utilizatorCurent.email}`}</span>
                    </h2>
                </div>
            )}

            {utilizatorCurent && firmaCurenta !== null && (
                <div className="mt-2">
                    <h2>
                        <span className="text-gray-600 font-semibold">
                            Denumire:{" "}
                        </span>
                        <span className="text-gray-500">{`${firmaCurenta.denumire_firma}`}</span>
                    </h2>
                    <h2>
                        <span className="text-gray-600 font-semibold">Rol: </span>
                        <span className="text-gray-500">Firmă</span>
                    </h2>
                    <h2>
                        <span className="text-gray-600 font-semibold">
                            Adresă:{" "}
                        </span>{" "}
                        <span className="text-gray-500">{`Str. ${utilizatorCurent.strada}, Nr. ${utilizatorCurent.numar}, ${localitate ? localitate.denumire_localitate : ""}, Constanța`}</span>
                    </h2>
                    <h2>
                        <span className="text-gray-600 font-semibold">Email: </span>{" "}
                        <span className="text-gray-500">{`${utilizatorCurent.email}`}</span>
                    </h2>
                </div>
            )}
        </section>
    )
}

export default DescriereUtilizator