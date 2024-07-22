import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UpcomingIcon from "@mui/icons-material/Upcoming";

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

interface StatusProps {
    dataInceput: Date;
    dataSfarsit: Date;
}

const Status: React.FC<StatusProps> = ({ dataInceput, dataSfarsit }) => {
    const data_inceput = dayjs(dataInceput);
    const data_sfarsit = dayjs(dataSfarsit);
    const data_curenta = dayjs(new Date());

    return (
        <>
            {data_sfarsit.isBefore(data_curenta, "day") && (
                <div className="w-40 border rounded-lg border-[#388e3c] bg-[#388e3c] flex justify-center gap-1 p-1">
                    <CheckCircleIcon className="text-white" fontSize="small" />
                    <span className="text-sm text-white font-semibold">
                        Finalizat
                    </span>
                </div>
            )}
            {data_curenta.isSameOrAfter(data_inceput, "day") &&
                data_curenta.isSameOrBefore(data_sfarsit, "day") && (
                    <div className="w-40 border rounded-lg border-[#f57c00] bg-[#f57c00] flex justify-center gap-1 p-1">
                        <InfoIcon className="text-white" fontSize="small" />
                        <span className="text-sm text-white font-semibold">
                            În vigoare
                        </span>
                    </div>
                )}
            {data_inceput.isAfter(data_curenta, "day") && (
                <div className="w-40 border rounded-lg border-[#0288d1] bg-[#0288d1] flex justify-center gap-1 p-1">
                    <UpcomingIcon className="text-white" fontSize="small" />
                    <span className="text-sm text-white font-semibold">
                        Urmează
                    </span>
                </div>
            )}
        </>
    );
};

export default Status;

// { dayjs.utc(container.data_sfarsit).isSameOrAfter(dayjs.utc(new Date())) ? <Nefinalizata /> : <Finalizata /> }
