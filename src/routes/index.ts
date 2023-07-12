import { Router } from "express";
import multer from "multer";
import { getCsv } from "../controllers";

const router = Router();
const multerConfig = multer();

router.post("/", multerConfig.single("file"), getCsv);

export default router;
