import fs from "fs";
import csvParser from "csv-parser";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export async function readCsv(file: any) {
  try {
    const csvRows: any = [];
    await new Promise((resolve, reject) => {
      const stream = csvParser()
        .on("data", (data: any) => csvRows.push(data))
        .on("error", (error: any) => reject(error))
        .on("end", () => resolve(csvRows));
      stream.write(file);
      stream.end();
    });
    return csvRows;
  } catch (err) {
    console.log(err);
  }
}

export async function pdfGenerator(arr: any) {
  const body = [];
  for (const el of arr) {
    const rows = new Array();
    rows.push({
      text: `${el.id} - ${el.nome_sacado} - ${el.valor} - ${el.linha_digitavel}`,
      pageBreak: "after",
    });
    body.push(rows);
  }

  const font = {
    Courier: {
      normal: "Courier",
      bold: "Courier-Bold",
      italics: "Courier-Oblique",
      bolditalics: "Courier-BoldOblique",
    },
  };
  const printer = new PdfPrinter(font);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Courier" },
    content: [...body],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  pdfDoc.pipe(fs.createWriteStream("Boletos.pdf"));

  pdfDoc.end();
}

export async function generateSingleBoleto(text: string) {
  function extractData(text: string) {
    const parts = text.split(" - ");
    const boletoId = parts[0];
    const name = parts[1];
    const value = parts[2];
    const code = parts[3];
    return { boletoId, name, value, code };
  }
  const boletoData = extractData(text);

  const font = {
    Courier: {
      normal: "Courier",
      bold: "Courier-Bold",
      italics: "Courier-Oblique",
      bolditalics: "Courier-BoldOblique",
    },
  };

  const printer = new PdfPrinter(font);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Courier" },
    content: {
      text: `${boletoData.name} - ${boletoData.value} - ${boletoData.code}`,
    },
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinitions);
  pdfDoc.pipe(fs.createWriteStream(`${boletoData.boletoId}.pdf`));
  pdfDoc.end();
}

export async function generatePdfReport(array: any) {
  const body = [];
  const chunks: any[] = [];
  let result;
  for (const el of array) {
    const rows = new Array();
    rows.push(`${el.id}`);
    rows.push(`${el.nome_sacado}`);
    rows.push(`${el.id_lote}`);
    rows.push(`${el.valor}`);
    rows.push(`${el.linha_digitavel}`);
    body.push(rows);
  }
  const font = {
    Courier: {
      normal: "Courier",
      bold: "Courier-Bold",
      italics: "Courier-Oblique",
      bolditalics: "Courier-BoldOblique",
    },
  };
  const printer = new PdfPrinter(font);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Courier" },
    content: [
      {
        style: "tableExample",
        table: {
          body: [
            ["id", "nome_sacado", "id_lote", "valor", "linha_digitavel"],
            ...body,
          ],
        },
      },
    ],
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.end();
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.on("error", (error) => reject(error));
  });

  return pdfBuffer;
}
