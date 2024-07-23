import React from 'react'
import { Link } from 'react-router-dom'

interface CardEroareProps {
    mesaj: string;
}

const CardEroare: React.FC<CardEroareProps> = ({ mesaj }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 mt-10">
            <img className="w-1/3" src="/empty.svg" />
            <p className="w-1/2 text-base font-bold text-center">
                <span className="text-red-700">
                    {mesaj}
                </span>{" "}
                Puteți închiria un container{" "}
                <Link to={"/containere"}>
                    <span className="text-green-700 font-semibold">
                        aici
                    </span>
                </Link>
                .{" "}
            </p>
        </div>
    )
}

export default CardEroare