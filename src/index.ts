import "dotenv/config";
import express from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes";
import handleError from "./middlewares/errorHandler";

const app = express();

app.use(cors()).use(express.json()).use(router).use(handleError);

export { app };
