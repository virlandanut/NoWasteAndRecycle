import React from 'react'
import { ContainerInchiriereReciclareCuRelatii } from '../../../../../server/Routes/Container/Interfete'
import Status from './Status'
import { Contract_reciclare } from '@prisma/client'
import { InterfataNotificare } from '../../../../componente/Erori/Notificare/Interfete'

interface CardContainerReciclareInchiriatProps {
    container: ContainerInchiriereReciclareCuRelatii
}

const CardContainerReciclareInchiriat: React.FC<CardContainerReciclareInchiriatProps> = ({ container }) => {

    const [contract, setContract] = React.useState<Contract_reciclare | null>(null);
    const [notificare, setNotificare] = React.useState<InterfataNotificare>({
        open: false,
        mesaj: "",
        tip: ""
    })

    React.useEffect(() => {

        const fetchContract = async () => {

            const api: string | undefined = process.env.API_CONTAINER_RECICLARE;
            if (!api) {
                setNotificare({ open: true, mesaj: "API-ul contractului de reciclare este eronat", tip: "eroare" });
            }

            try {
                const raspuns = await fetch(api + `/${container.id_container_reciclare}/contract`)
                if (!raspuns.ok) {
                    setNotificare({ open: true, mesaj: "Contractul de reciclare nu a fost primit de la server", tip: "eroare" });
                }

                const data = await raspuns.json();
                setContract(data);

            } catch (eroare) {
                setNotificare({ open: true, mesaj: "Contractul nu a putut fi obținut de la server", tip: "eroare" });
            }
        }

        fetchContract();

    }, []);

    return (
        contract && <div key={container.id_container_reciclare} className="p-5 flex flex-col gap-5 border rounded-xl" >
            <section className="flex gap-3 items-center">
                <Status dataInceput={container.data_inceput} dataSfarsit={container.data_sfarsit} />
                <div className="border-l border-gray-400 pl-2">
                    <h2 className='text-gray-500'>{new Date(container.data_inceput).toLocaleDateString().replaceAll("/", ".")} - {new Date(container.data_sfarsit).toLocaleDateString().replaceAll("/", ".")}</h2>
                </div>
            </section>
            <div className="flex gap-3">
                <img className="w-[150px] h-[150px] object-cover" src={container.Container.poza!} alt="" />
                <section className="flex-col">
                    <div>
                        <div className="flex gap-x-2">
                            <h1 className="text-lg font-semibold text-red-700">{container.Container.denumire}</h1>
                            <h2 className="text-gray-500">(deținut de <span className="font-semibold text-green-700">{container.Firma.denumire_firma}</span>)</h2>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h1 className="text-gray-500"><span className="font-semibold text-gray-600">Contract:</span> {contract.numar_contract}</h1>
                        <h2 className="text-gray-500"><span className="font-semibold text-gray-600">Dată emitere:</span> {new Date(contract.data).toLocaleDateString().replaceAll("/", ".")}</h2>
                        <h3 className="text-green-700 font-semibold"><span className="font-semibold text-gray-600">Preț achitat:</span> {contract.pret} RON</h3>
                    </div>
                </section>
            </div >
        </div >
    )
}

export default CardContainerReciclareInchiriat