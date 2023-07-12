import { Boleto, CsvElement } from "../interfaces";
import { getBoletos, getLots, saveBoleto } from "../repositories";
import { pdfGenerator, readCsv } from "../utils";

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
  const boletos = await getBoletos();
  const orderedBoletos = boletos.sort((a, b) => a.id - b.id);
  await pdfGenerator(orderedBoletos);
}
