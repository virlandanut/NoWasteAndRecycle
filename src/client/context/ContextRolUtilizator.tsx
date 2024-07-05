import React from 'react';
import { UtilizatorCurent } from '../views/Raportare/ArataRaport/Interfete';

export const UtilizatorCurentContext = React.createContext<UtilizatorCurent | null>(null);

interface ContextRolUtilizatorProps {
    children: React.ReactNode;
}

const ContextRolUtilizator = ({ children }: ContextRolUtilizatorProps) => {

    const [utilizatorCurent, setUtilizatorCurent] = React.useState<UtilizatorCurent | null>(null);

    React.useEffect(() => {

    }, []);

    return (
        <div>ContextRolUtilizator</div>
    )
}

export default ContextRolUtilizator