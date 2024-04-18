import React, { useState } from "react";

interface InfoProps {
  text: string;
  width: string;
  children: React.ReactNode;
}

const Info = ({ text, children, width }: InfoProps) => {
  const [afisareInfo, setAfisareInfo] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setAfisareInfo(true);
  };
  const handleMouseLeave = () => {
    setAfisareInfo(false);
  };

  return (
    <div className="flex flex-col">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      <div
        className={`flex flex-col gap-2 items-center justify-center relative`}>
        <div
          className={`w-[180px] text-sm text-black font-semibold bg-white shadow-md text-center p-4 border rounded-lg transition-all ease-in duration-75 top-[10px] absolute ${afisareInfo ? "translate-y-3 opacity-100" : "-translate-y-3 opacity-0 "}`}>
          {text}
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-b-[black] border-solid border-transparent absolute top-[-8px] left-[calc(50%-12px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default Info;
