import fs from "fs";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { datePdfReciclare } from "./Interfete.js";

export async function completeazaPDFReciclare(data: datePdfReciclare) {
  const pdf = fs.readFileSync("documents/form_reciclare.pdf");
  const document = await PDFDocument.load(pdf);
  document.registerFontkit(fontkit);
  const font = fs.readFileSync("documents/DejaVuSans.ttf");
  const customFont = await document.embedFont(font);
  const marimeFont = 9;

  const form = document.getForm();

  const proprietarDenumire = form.getTextField("proprietarDenumire");
  proprietarDenumire.setText(data.proprietarDenumire);
  proprietarDenumire.setFontSize(marimeFont);
  proprietarDenumire.updateAppearances(customFont);

  const cifProprietar = form.getTextField("cifProprietar");
  cifProprietar.setText(data.cifProprietar);
  cifProprietar.setFontSize(marimeFont);
  cifProprietar.updateAppearances(customFont);

  const judetProprietar = form.getTextField("judetProprietar");
  judetProprietar.setText(data.judetProprietar);
  judetProprietar.setFontSize(marimeFont);
  judetProprietar.updateAppearances(customFont);

  const localitateProprietar = form.getTextField("localitateProprietar");
  localitateProprietar.setText(data.localitateProprietar);
  localitateProprietar.setFontSize(marimeFont);
  localitateProprietar.updateAppearances(customFont);

  const stradaProprietar = form.getTextField("stradaProprietar");
  stradaProprietar.setText(data.stradaProprietar);
  stradaProprietar.setFontSize(marimeFont);
  stradaProprietar.updateAppearances(customFont);

  const numarProprietar = form.getTextField("numarProprietar");
  numarProprietar.setText(data.numarProprietar);
  numarProprietar.setFontSize(marimeFont);
  numarProprietar.updateAppearances(customFont);

  const cumparatorDenumire = form.getTextField("cumparatorDenumire");
  cumparatorDenumire.setText(data.cumparatorDenumire);
  cumparatorDenumire.setFontSize(marimeFont);
  cumparatorDenumire.updateAppearances(customFont);

  const cifCumparator = form.getTextField("cifCumparator");
  cifCumparator.setText(data.cifCumparator);
  cifCumparator.setFontSize(marimeFont);
  cifCumparator.updateAppearances(customFont);

  const judetCumparator = form.getTextField("judetCumparator");
  judetCumparator.setText(data.judetCumparator);
  judetCumparator.setFontSize(marimeFont);
  judetCumparator.updateAppearances(customFont);

  const localitateCumparator = form.getTextField("localitateCumparator");
  localitateCumparator.setText(data.localitateCumparator);
  localitateCumparator.setFontSize(marimeFont);
  localitateCumparator.updateAppearances(customFont);

  const stradaCumparator = form.getTextField("stradaCumparator");
  stradaCumparator.setText(data.stradaCumparator);
  stradaCumparator.setFontSize(marimeFont);
  stradaCumparator.updateAppearances(customFont);

  const numarCumparator = form.getTextField("numarCumparator");
  numarCumparator.setText(data.numarCumparator);
  numarCumparator.setFontSize(marimeFont);
  numarCumparator.updateAppearances(customFont);

  const judetContainer = form.getTextField("judetContainer");
  judetContainer.setText(data.judetContainer);
  judetContainer.setFontSize(marimeFont);
  judetContainer.updateAppearances(customFont);

  const localitateContainer = form.getTextField("localitateContainer");
  localitateContainer.setText(data.localitateContainer);
  localitateContainer.setFontSize(marimeFont);
  localitateContainer.updateAppearances(customFont);

  const stradaContainer = form.getTextField("stradaContainer");
  stradaContainer.setText(data.stradaContainer);
  stradaContainer.setFontSize(marimeFont);
  stradaContainer.updateAppearances(customFont);

  const numarContainer = form.getTextField("numarContainer");
  numarContainer.setText(data.numarContainer);
  numarContainer.setFontSize(marimeFont);
  numarContainer.updateAppearances(customFont);

  const pretTotal = form.getTextField("pretTotal");
  pretTotal.setText(data.pretTotal);
  pretTotal.setFontSize(marimeFont);
  pretTotal.updateAppearances(customFont);

  const dataInceput = form.getTextField("dataInceput");
  dataInceput.setText(data.dataInceput);
  dataInceput.setFontSize(marimeFont);
  dataInceput.updateAppearances(customFont);

  const dataSfarsit = form.getTextField("dataSfarsit");
  dataSfarsit.setText(data.dataSfarsit);
  dataSfarsit.setFontSize(marimeFont);
  dataSfarsit.updateAppearances(customFont);

  const pdfBytes = await document.save();
  return pdfBytes;
}
