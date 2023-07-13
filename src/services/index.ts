import fs from "fs";

import { Boleto, CsvElement } from "../interfaces";
import { getBoletos, getLots, saveBoleto } from "../repositories";
import {
  generatePdfReport,
  generateSingleBoleto,
  pdfGenerator,
  readCsv,
} from "../utils";

import PdfParse from "pdf-parse";

export async function checkUnit(file: any) {
  const list: Array<CsvElement> = await readCsv(file);
  const lots = await getLots();
  const boletos = [];

  for (const element of list) {
    for (const lot of lots) {
      if (Number(element.unidade) === Number(lot.nome)) {
        boletos.push({
          nome_sacado: element.nome,
          id_lote: lot.id,
          valor: Number(element.valor).toFixed(2),
          linha_digitavel: element.linha_digitavel,
          criado_em: new Date().toISOString(),
        });
      }
    }
  }
  boletos.map(async (el: Boleto) => await saveBoleto(el));
}

export async function generateBoletosPdf() {
  const boletos = await getBoletos({});
  const orderedBoletos = boletos.sort((a, b) => a.id - b.id);
  await pdfGenerator(orderedBoletos);
}

export async function generateSingleBoletoPdf(file: any) {
  PdfParse(file).then(async (parsedData) => {
    const pages = parsedData.text.split("\n");
    const splitedPages: string[] = [];
    pages.map((page) => {
      if (page !== "") splitedPages.push(page);
    });
    for (let i = 0; i < splitedPages.length; i++) {
      await generateSingleBoleto(splitedPages[i]);
    }
  });
}

export async function generateReport() {
  const boletos = await getBoletos({});
  const pdf = await generatePdfReport(boletos);
  return pdf;
}
