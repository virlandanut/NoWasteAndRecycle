import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react'

interface IntervalCalendaristicProps {
    setDataInceput: (date: Dayjs | null) => void;
    setDataSfarsit: (date: Dayjs | null) => void;
    dataInceput: Dayjs | null;
    disabledDates: Dayjs[];
    setValue: any;
    errors: any;
    register: any;
    handleSubmit: any;
    onSubmit: any;
}

const IntervalCalendaristic: React.FC<IntervalCalendaristicProps> = ({
    setDataInceput,
    setDataSfarsit,
    setValue,
    dataInceput,
    disabledDates,
    errors,
    register,
    handleSubmit,
    onSubmit
}) => {
    const shouldDisableDate = (date: Dayjs) => {
        return disabledDates.some((disabledDate) => date.isSame(disabledDate, "day"));
    };

    const handleDataInceput = (date: Dayjs | null) => {
        setDataInceput(date);
        setValue("data_inceput", date);
    };

    const handleDataSfarsit = (date: Dayjs | null) => {
        setDataSfarsit(date);
        setValue("data_sfarsit", date);
    };

    return (
        <section className="flex flex-col gap-3 mb-2">
            <form
                id="formDate"
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-3">
                <DatePicker
                    minDate={dayjs()}
                    className="w-1/2"
                    slotProps={{
                        textField: {
                            ...register("data_inceput", {
                                required: "Obligatoriu",
                            }),
                            size: "small",
                            color: "success",
                            error: Boolean(errors.data_inceput),
                            helperText: errors.data_inceput?.message,
                        },
                    }}
                    label="Dată început"
                    onChange={handleDataInceput}
                    shouldDisableDate={shouldDisableDate}
                    disablePast
                />
                <DatePicker
                    disabled={dataInceput === null}
                    minDate={dataInceput!}
                    className="w-1/2"
                    slotProps={{
                        textField: {
                            ...register("data_sfarsit"),
                            size: "small",
                            color: "success",
                            error: Boolean(errors.data_sfarsit),
                            helperText: errors.data_sfarsit?.message,
                        },
                    }}
                    label="Dată sfârșit"
                    onChange={handleDataSfarsit}
                    shouldDisableDate={shouldDisableDate}
                    disablePast
                />
            </form>
        </section>
    )
}

export default IntervalCalendaristic