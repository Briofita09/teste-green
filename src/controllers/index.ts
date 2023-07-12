import { Request, Response } from "express";
import { checkUnit } from "../services";

export async function getCsv(req: Request, res: Response) {
  await checkUnit(req.file?.buffer);
  return res.send();
}
