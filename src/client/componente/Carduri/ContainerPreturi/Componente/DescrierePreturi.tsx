import React from 'react'
import { PretContainer } from '../../../../../server/Routes/Container/Interfete'
import { Perioade } from '../Interfete';
import { Divider } from '@mui/material';

interface DescrierePreturiProps {
    preturi: PretContainer[];
    perioade: Perioade,
    pretCuTVA: number;
    pretTotal: number;
    pretFaraTaxa: number;
}

const DescrierePreturi: React.FC<DescrierePreturiProps> = ({
    preturi,
    perioade,
    pretCuTVA,
    pretTotal,
    pretFaraTaxa
}) => {
    return (
        <>
            <section className="mt-3 mb-3">
                {Object.entries(perioade).map(([tipPret, durata]) => {
                    const pret = preturi.find(
                        (pret) => pret.denumire_tip_pret === tipPret
                    );
                    if (pret && durata > 0) {
                        return (
                            <div className="flex justify-between" key={tipPret}>
                                <h3 key={tipPret} className="text-gray-500">
                                    &#8226; {`${tipPret}`} <span>{`x ${durata}:`}</span>
                                </h3>
                                <h4>
                                    <span className="text-sm font-bold text-gray-600">{`${pret.pret * durata}`}</span>{" "}
                                    <span className="text-sm text-green-700">RON</span>
                                </h4>
                            </div>
                        );
                    }
                })}
                {pretCuTVA > 0 && (
                    <>
                        <div className="flex justify-between">
                            <h3 className="text-gray-500">&#8226; Taxă platformă:</h3>
                            <h4>
                                <span className="text-sm font-bold text-gray-600">
                                    {(pretTotal - pretFaraTaxa).toFixed(2)}
                                </span>{" "}
                                <span className="text-sm text-green-700">RON</span>
                            </h4>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-gray-500">&#8226; TVA (19%):</h3>
                            <h4>
                                <span className="text-sm font-bold text-gray-600">
                                    {(pretCuTVA - pretTotal).toFixed(2)}
                                </span>{" "}
                                <span className="text-sm text-green-700">RON</span>
                            </h4>
                        </div>
                    </>
                )}
            </section>
            <Divider />
            <section className="flex justify-end">
                <h2 className="mt-2">
                    <span className="text-gray-500">Preț total:</span>{" "}
                    <span className="font-bold text-gray-600">
                        {pretCuTVA.toFixed(2)}
                    </span>{" "}
                    <span className="font-bold text-green-700">RON</span>
                </h2>
            </section>
        </>

    )
}

export default DescrierePreturi