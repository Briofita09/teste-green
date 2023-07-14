import fs from "fs";

import { BoletoInterface, CsvElement, PDF } from "../interfaces";
import { getBoletos, getLots, saveBoleto } from "../repositories";
import {
  generatePdfReport,
  generateSingleBoleto,
  pdfGenerator,
  readCsv,
} from "../utils";

import PdfParse from "pdf-parse";
import { BoletoDbError, IncorrectFile, PdfGenerationError } from "../errors";

export async function checkUnit(file: any): Promise<void> {
  const list: Array<CsvElement> = await readCsv(file);
  const lots = await getLots();
  const boletos = [];

  if (!list[0].nome) throw IncorrectFile();
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
  boletos.map(async (el: BoletoInterface) => {
    try {
      await saveBoleto(el);
    } catch (err) {
      console.log(err);
      throw BoletoDbError(el);
    }
  });
}

export async function generateBoletosPdf(): Promise<PDFKit.PDFDocument> {
  const boletos = await getBoletos({});
  const orderedBoletos = boletos.sort((a, b) => a.id - b.id);
  const pdf = await pdfGenerator(orderedBoletos);
  if (!pdf) throw PdfGenerationError();
  return pdf;
}

export async function generateSingleBoletoPdf(file: any): Promise<void> {
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

export async function generateReport(): Promise<Buffer> {
  const boletos = await getBoletos({});
  const pdf = await generatePdfReport(boletos);
  if (!pdf) throw PdfGenerationError();
  return pdf;
}
