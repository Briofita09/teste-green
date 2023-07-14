import { Request, Response } from "express";
import {
  checkUnit,
  generateBoletosPdf,
  generateReport,
  generateSingleBoletoPdf,
} from "../services";
import { getBoletos } from "../repositories";
import { IncorrectFileType, NotFoundCsv } from "../errors";

export async function getCsv(req: Request, res: Response) {
  if (!req.file?.buffer) throw NotFoundCsv();
  if (req.file?.mimetype !== "text/csv") throw IncorrectFileType();
  await checkUnit(req.file?.buffer);
  return res.send();
}

export async function generatePdf(_req: Request, res: Response) {
  await generateBoletosPdf();
  return res.send();
}

export async function generateBoleto(req: Request, res: Response) {
  if (req.file?.mimetype !== "application/pdf") throw IncorrectFileType();
  await generateSingleBoletoPdf(req.file?.buffer);
  return res.send();
}

export async function getAllBoletos(req: Request, res: Response) {
  if (req.query.relatorio === "1") {
    const pdf = await generateReport();
    const base64String = Buffer.from(pdf).toString("base64");
    return res.status(200).send(base64String);
  }
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

  return res.status(200).json(boletos);
}
