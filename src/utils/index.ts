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
      text: `${el.nome_sacado} - ${el.valor} - ${el.linha_digitavel}`,
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
