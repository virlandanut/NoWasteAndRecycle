import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ToggleInchiriereFirmaProps {
    setTipInchiriere: React.Dispatch<React.SetStateAction<number>>;
}

const ToggleInchiriereFirma: React.FC<ToggleInchiriereFirmaProps> = ({
    setTipInchiriere,
}) => {
    const [toggle, setToggle] = React.useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        if (value !== null) {
            setToggle(value);
            setTipInchiriere(value);
        }
    };

    return (
        <ToggleButtonGroup
            color="success"
            value={toggle}
            defaultValue={toggle}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value={0}>Reciclare</ToggleButton>
            <ToggleButton value={1}>Depozitare</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ToggleInchiriereFirma;
