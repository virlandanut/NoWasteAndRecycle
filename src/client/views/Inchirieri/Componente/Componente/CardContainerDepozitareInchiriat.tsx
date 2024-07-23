import React from 'react'
import { ContainerInchiriereDepozitareCuRelatii } from '../../../../../server/Routes/Container/Inchiriere/Interfete'
import { Contract_inchiriere } from '@prisma/client';
import { InterfataNotificare } from '../../../../componente/Erori/Notificare/Interfete';
import Notificare from '../../../../componente/Erori/Notificare/Notificare';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Status from './Status';

interface CardContainerDepozitareInchiriatProps {
    container: ContainerInchiriereDepozitareCuRelatii;
    status: number;
}

const CardContainerDepozitareInchiriat: React.FC<CardContainerDepozitareInchiriatProps> = ({ container, status }) => {
    const [contract, setContract] = React.useState<Contract_inchiriere | null>(null);
    const [notificare, setNotificare] = React.useState<InterfataNotificare>({
        open: false,
        mesaj: "",
        tip: "",
    });

    const descarcaContract = async () => {
        try {
            const api: string | undefined = process.env.API_CONTRACT_DEPOZITARE;
            if (!api) {
                setNotificare({
                    open: true,
                    mesaj: "API-ul de descărcare a contractului este eronat",
                    tip: "eroare",
                });
            }
            const raspuns = await fetch(api + `${container.id_container_depozitare}`);
            if (!raspuns.ok) {
                setNotificare({
                    open: true,
                    mesaj: "Contractul de depozitare nu a putut fi descărcat",
                    tip: "eroare"
                });
                return;
            }
            const blob = await raspuns.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "contract_reciclare.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (eroare) {
            setNotificare({
                open: true,
                mesaj: "Contractul de reciclare nu a putut fi descărcat",
                tip: "eroare",
            });
        }

    }

    React.useEffect(() => {
        const fetchContract = async () => {
            const api: string | undefined = process.env.API_CONTAINER_DEPOZITARE;
            console.log(api);
            if (!api) {
                setNotificare({
                    open: true,
                    mesaj: "API-ul contractului de depozitare este eronat",
                    tip: "eroare",
                });
                return
            }
            try {
                const raspuns = await fetch(api + `/${container.id_container_depozitare}/contract`);
                if (!raspuns.ok) {
                    setNotificare({
                        open: true,
                        mesaj: "Contractul de depozitare nu a fost primit de la server",
                        tip: "eroare",
                    });
                }

                const data = await raspuns.json();
                setContract(data);

            } catch (eroare) {
                setNotificare({
                    open: true,
                    mesaj: "Contractul nu a putut fi obținut de la server",
                    tip: "eroare",
                });
            }
        }

        fetchContract();
    }, [])
    return (

        contract && (
            <div
                key={container.id_container_depozitare}
                className="p-5 flex flex-col gap-5 border rounded-xl"
            >
                <section className="flex gap-3 items-center">
                    <Status
                        status={status}
                    />
                    <div className="border-l border-gray-400 pl-2">
                        <h2 className="text-gray-500">
                            {new Date(container.data_inceput)
                                .toLocaleDateString()
                                .replaceAll("/", ".")}{" "}
                            -{" "}
                            {new Date(container.data_sfarsit)
                                .toLocaleDateString()
                                .replaceAll("/", ".")}
                        </h2>
                    </div>
                </section>
                <section className="flex justify-between">
                    <div className="flex gap-3">
                        <img
                            className="w-40 h-40 object-cover"
                            src={container.Container.poza!}
                            alt=""
                        />
                        <section className="flex-col">
                            <div>
                                <div className="flex gap-x-2">
                                    <h1 className="text-xl font-bold text-red-700">
                                        {container.Container.denumire}
                                    </h1>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h1 className="text-gray-500">
                                    <span className="font-semibold text-gray-600">
                                        Contract:
                                    </span>{" "}
                                    {contract.numar_contract}
                                </h1>
                                <h2 className="text-gray-500">
                                    <span className="font-semibold text-gray-600">
                                        Dată emitere:
                                    </span>{" "}
                                    {new Date(contract.data)
                                        .toLocaleDateString()
                                        .replaceAll("/", ".")}
                                </h2>
                                <h3 className="text-green-700 font-semibold">
                                    <span className="font-semibold text-gray-600">
                                        Preț achitat:
                                    </span>{" "}
                                    {contract.pret} RON
                                </h3>
                            </div>
                        </section>
                    </div>
                    <section className="mt-2 self-end">
                        <Tooltip title="Descarcă contract">
                            <IconButton
                                color="success"
                                onClick={descarcaContract}
                            >
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Descarcă factură">
                            <IconButton color="success">
                                <ReceiptIcon />
                            </IconButton>
                        </Tooltip>
                        {/*<Tooltip title="Reziliere factură">
                            <IconButton color="error">
                                <DescriptionIcon />
                            </IconButton>
                        </Tooltip>*/}
                    </section>
                </section>
                <Notificare notificare={notificare} setNotificare={setNotificare} />
            </div>
        )

    )
}

export default CardContainerDepozitareInchiriat