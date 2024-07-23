import fs from "fs";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
  datePdfInchirierePF,
  datePdfInchirierePJ,
  datePdfReciclare,
} from "./Interfete.js";

export async function completeazaPDFReciclare(data: datePdfReciclare) {
  const pdf = fs.readFileSync("documents/form_reciclare.pdf");
  const document = await PDFDocument.load(pdf);
  document.registerFontkit(fontkit);
  const font = fs.readFileSync("documents/DejaVuSans.ttf");
  const customFont = await document.embedFont(font);
  const marimeFont = 9;

  const form = document.getForm();

  const setField = (nume: string, valoare: string) => {
    const field = form.getTextField(nume);
    field.setText(valoare);
    field.setFontSize(marimeFont);
    field.updateAppearances(customFont);
  };

  setField("proprietarDenumire", data.proprietarDenumire);
  setField("cifProprietar", data.cifProprietar);
  setField("judetProprietar", data.judetProprietar);
  setField("localitateProprietar", data.localitateProprietar);
  setField("stradaProprietar", data.stradaProprietar);
  setField("numarProprietar", data.numarProprietar);
  setField("cumparatorDenumire", data.cumparatorDenumire);
  setField("cifCumparator", data.cifCumparator);
  setField("judetCumparator", data.judetCumparator);
  setField("localitateCumparator", data.localitateCumparator);
  setField("stradaCumparator", data.stradaCumparator);
  setField("numarCumparator", data.numarCumparator);
  setField("judetContainer", data.judetContainer);
  setField("localitateContainer", data.localitateContainer);
  setField("stradaContainer", data.stradaContainer);
  setField("numarContainer", data.numarContainer);
  setField("pretTotal", data.pretTotal);
  setField("dataInceput", data.dataInceput);
  setField("dataSfarsit", data.dataSfarsit);

  const pdfBytes = await document.save();
  return pdfBytes;
}

export async function completeazaPDFInchirierePJ(data: datePdfInchirierePJ) {
  const pdf = fs.readFileSync("documents/form_inchiriere_PJ.pdf");
  const document = await PDFDocument.load(pdf);
  document.registerFontkit(fontkit);
  const font = fs.readFileSync("documents/DejaVuSans.ttf");
  const customFont = await document.embedFont(font);
  const marimeFont = 9;

  const form = document.getForm();

  const setField = (nume: string, valoare: string) => {
    const field = form.getTextField(nume);
    field.setText(valoare);
    field.setFontSize(marimeFont);
    field.updateAppearances(customFont);
  };

  setField("tipContainer", data.tipContainer);
  setField("proprietarDenumire", data.proprietarDenumire);
  setField("cifProprietar", data.cifProprietar);
  setField("judetProprietar", data.judetProprietar);
  setField("localitateProprietar", data.localitateProprietar);
  setField("stradaProprietar", data.stradaProprietar);
  setField("numarProprietar", data.numarProprietar);
  setField("cumparatorDenumire", data.cumparatorDenumire);
  setField("cifCumparator", data.cifCumparator);
  setField("judetCumparator", data.judetCumparator);
  setField("localitateCumparator", data.localitateCumparator);
  setField("stradaCumparator", data.stradaCumparator);
  setField("numarCumparator", data.numarCumparator);
  setField("judetContainer", data.judetContainer);
  setField("localitateContainer", data.localitateContainer);
  setField("stradaContainer", data.stradaContainer);
  setField("numarContainer", data.numarContainer);
  setField("pretTotal", data.pretTotal);
  setField("dataInceput", data.dataInceput);
  setField("dataSfarsit", data.dataSfarsit);

  const pdfBytes = await document.save();
  return pdfBytes;
}

export async function completeazaPDFInchirierePF(data: datePdfInchirierePF) {
  const pdf = fs.readFileSync("documents/form_inchiriere_PF.pdf");
  const document = await PDFDocument.load(pdf);
  document.registerFontkit(fontkit);
  const font = fs.readFileSync("documents/DejaVuSans.ttf");
  const customFont = await document.embedFont(font);
  const marimeFont = 9;

  const form = document.getForm();

  const setField = (nume: string, valoare: string) => {
    const field = form.getTextField(nume);
    field.setText(valoare);
    field.setFontSize(marimeFont);
    field.updateAppearances(customFont);
  };

  setField("tipContainer", data.tipContainer);
  setField("proprietarDenumire", data.proprietarDenumire);
  setField("cifProprietar", data.cifProprietar);
  setField("judetProprietar", data.judetProprietar);
  setField("localitateProprietar", data.localitateProprietar);
  setField("stradaProprietar", data.stradaProprietar);
  setField("numarProprietar", data.numarProprietar);
  setField("cumparatorDenumire", data.cumparatorDenumire);
  setField("cnpCumparator", data.cnpCumparator);
  setField("judetCumparator", data.judetCumparator);
  setField("localitateCumparator", data.localitateCumparator);
  setField("stradaCumparator", data.stradaCumparator);
  setField("numarCumparator", data.numarCumparator);
  setField("judetContainer", data.judetContainer);
  setField("localitateContainer", data.localitateContainer);
  setField("stradaContainer", data.stradaContainer);
  setField("numarContainer", data.numarContainer);
  setField("pretTotal", data.pretTotal);
  setField("dataInceput", data.dataInceput);
  setField("dataSfarsit", data.dataSfarsit);

  const pdfBytes = await document.save();
  return pdfBytes;
}
