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
    status: number
}

const Status: React.FC<StatusProps> = ({ status }) => {
    return (
        <>
            {status === 0 && (
                <div className="w-40 border rounded-lg border-[#f57c00] bg-[#f57c00] flex justify-center gap-1 p-1">
                    <InfoIcon className="text-white" fontSize="small" />
                    <span className="text-sm text-white font-semibold">
                        În vigoare
                    </span>
                </div>
            )}
            {status === 1 && (
                <div className="w-40 border rounded-lg border-[#0288d1] bg-[#0288d1] flex justify-center gap-1 p-1">
                    <UpcomingIcon className="text-white" fontSize="small" />
                    <span className="text-sm text-white font-semibold">
                        Urmează
                    </span>
                </div>
            )}
            {status === 2 && (
                <div className="w-40 border rounded-lg border-[#388e3c] bg-[#388e3c] flex justify-center gap-1 p-1">
                    <CheckCircleIcon className="text-white" fontSize="small" />
                    <span className="text-sm text-white font-semibold">
                        Finalizat
                    </span>
                </div>
            )}
        </>
    );
};

export default Status;

