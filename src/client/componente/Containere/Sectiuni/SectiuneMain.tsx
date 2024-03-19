import React from "react";
import { PropsSectiune } from "../../../../../interfaces";

const SectiuneMain: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <main className={tailwind}>{children}</main>;
};

export default SectiuneMain;
