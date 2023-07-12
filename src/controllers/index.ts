import { Request, Response } from "express";
import { checkUnit, generateBoletosPdf } from "../services";

export async function getCsv(req: Request, res: Response) {
  await checkUnit(req.file?.buffer);
  return res.send();
}

export async function generatePdf(req: Request, res: Response) {
  await generateBoletosPdf();
  return res.send();
}
