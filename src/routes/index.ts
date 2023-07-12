import { Router } from "express";
import multer from "multer";
import { generatePdf, getCsv } from "../controllers";

const router = Router();
const multerConfig = multer();

router.post("/", multerConfig.single("file"), getCsv);
router.get("/generate-pdf", generatePdf);

export default router;
