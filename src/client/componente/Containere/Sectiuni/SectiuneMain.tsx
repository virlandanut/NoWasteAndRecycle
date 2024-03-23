import React from "react";
import { PropsSectiune } from "../../../../../interfaces";

const SectiuneMain: React.FC<PropsSectiune> = ({ tailwind, children }) => {
  return <section className={tailwind}>{children}</section>;
};

export default SectiuneMain;
