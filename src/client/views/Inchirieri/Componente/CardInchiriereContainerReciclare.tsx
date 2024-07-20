import React from 'react'
import { Divider, Paper } from '@mui/material'
import { ContainerInchiriereReciclareCuRelatii } from '../../../../server/Routes/Container/Interfete'
import Status from './Status';
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat"


dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

interface CardInchiriereContainerReciclareProps {
    containerReciclare: ContainerInchiriereReciclareCuRelatii[] | undefined
}

const CardInchiriereContainerReciclare: React.FC<CardInchiriereContainerReciclareProps> = (container) => {
    return (
        <div className="flex flex-col gap-5">
            {container.containerReciclare && container.containerReciclare.map(container => (
                <div key={container.id_container_reciclare} className="p-5 flex flex-col gap-5 border rounded-xl" >
                    <section className="flex gap-3 items-center">
                        <Status dataInceput={container.data_inceput} dataSfarsit={container.data_sfarsit} />
                        <div className="border-l border-gray-400 pl-2">
                            <h2 className='text-gray-500'>{new Date(container.data_inceput).toLocaleDateString().replaceAll("/", ".")} - {new Date(container.data_sfarsit).toLocaleDateString().replaceAll("/", ".")}</h2>
                        </div>
                    </section>
                    <div className="flex gap-3">
                        <img className="w-[150px] h-[150px] object-cover" src={container.Container.poza!} alt="" />
                        <section>
                            <div className="flex gap-x-2">
                                <h1 className="text-lg font-semibold text-red-700">{container.Container.denumire}</h1>
                                <h2 className="text-gray-500">(deținut de <span className="font-semibold text-green-700">{container.Firma.denumire_firma}</span>)</h2>
                            </div>
                            <p className="text-gray-500">{container.Container.descriere}</p>
                        </section>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default CardInchiriereContainerReciclare

// < h1 > { dayjs.utc(new Date(container.data_sfarsit).toLocaleDateString(), "DD.MM.YYYY").toString() }</h1 >
//     <h1>{dayjs.utc(new Date().toLocaleDateString(), "DD.MM.YYYY").toString()}</h1>