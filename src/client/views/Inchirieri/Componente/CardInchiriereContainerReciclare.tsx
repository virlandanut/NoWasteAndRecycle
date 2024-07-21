import React from 'react'
import { ContainerInchiriereReciclareCuRelatii } from '../../../../server/Routes/Container/Interfete'
import Status from './Componente/Status';
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Contract_reciclare } from '@prisma/client';
import { InterfataNotificare } from '../../../componente/Erori/Notificare/Interfete';
import CardContainerReciclareInchiriat from './Componente/CardContainerReciclareInchiriat';


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
                <CardContainerReciclareInchiriat key={container.id_container_reciclare} container={container} />
            ))}
        </div>

    )
}

export default CardInchiriereContainerReciclare

// < h1 > { dayjs.utc(new Date(container.data_sfarsit).toLocaleDateString(), "DD.MM.YYYY").toString() }</h1 >
//     <h1>{dayjs.utc(new Date().toLocaleDateString(), "DD.MM.YYYY").toString()}</h1>