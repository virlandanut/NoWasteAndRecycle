import React from "react";
import CardContainerReciclareInchiriat from "./Componente/CardContainerReciclareInchiriat";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CardInchiriereContainerDepozitareProps } from "../Interfete";
import { filtreazaContainereInchiriere } from "../Functii/Functii";
import CardContainerDepozitareInchiriat from "./Componente/CardContainerDepozitareInchiriat";
import CardEroare from "./Componente/CardEroare";

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);


const CardInchiriereContainerDepozitare: React.FC<CardInchiriereContainerDepozitareProps> = ({ containerDepozitare, filtru }) => {
    const [mesaj, setMesaj] = React.useState<string>("");
    const containereFiltrate = filtreazaContainereInchiriere({ containerDepozitare, filtru });

    React.useEffect(() => {

        if (filtru === 0 && containereFiltrate?.length === 0) {
            setMesaj(
                "Nu aveți niciun container de depozitare închiriat în vigoare deocamdată!"
            );
        } else if (filtru === 1 && containereFiltrate?.length === 0) {
            setMesaj(
                "Nu aveți niciun container de depozitare care urmează să fie închiriat în perioada următoare!"
            );
        } else if (filtru === 2 && containereFiltrate?.length === 0) {
            setMesaj(
                "Nu aveți niciun container de depozitare pentru care închirierea s-a finalizat!"
            );
        }
    }, [filtru, containereFiltrate]);


    return (
        <div className="flex flex-col gap-5">
            {containereFiltrate && containereFiltrate.length > 0 ? (
                containereFiltrate.map((container) => (
                    <CardContainerDepozitareInchiriat key={container.id_container_depozitare} container={container} status={filtru} />
                ))
            ) : (
                <CardEroare mesaj={mesaj} />
            )}
        </div>
    )
}

export default CardInchiriereContainerDepozitare