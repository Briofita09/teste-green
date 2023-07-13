import { Router } from "express";
import multer from "multer";
import {
  generateBoleto,
  generatePdf,
  getAllBoletos,
  getCsv,
} from "../controllers";

const router = Router();
const multerConfig = multer();

router.post("/", multerConfig.single("file"), getCsv);
router.get("/generate-pdf", generatePdf);
router.post("/generate-boleto", multerConfig.single("file"), generateBoleto);
router.get("/boletos", getAllBoletos);

export default router;
