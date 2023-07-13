import { Request, Response } from "express";
import {
  checkUnit,
  generateBoletosPdf,
  generateReport,
  generateSingleBoletoPdf,
} from "../services";
import { getBoletos } from "../repositories";

export async function getCsv(req: Request, res: Response) {
  await checkUnit(req.file?.buffer);
  return res.send();
}

export async function generatePdf(_req: Request, res: Response) {
  await generateBoletosPdf();
  return res.send();
}

export async function generateBoleto(req: Request, res: Response) {
  await generateSingleBoletoPdf(req.file?.buffer);
  return res.send();
}

export async function getAllBoletos(req: Request, res: Response) {
  const name = req.query.nome || "";
  const filter = {
    nome_sacado: { contains: name },
    valor: {
      gte: req.query.valor_inicial || undefined,
      lte: req.query.valor_final || undefined,
    },
    id_lote: req.query.id_lote || undefined,
  };

  const boletos = await getBoletos(filter);

  if (req.query.relatorio === "1") {
    const pdf = await generateReport();
  }

  return res.status(200).json(boletos);
}
