import express, { type Response } from "express";
import { type DiagnoseEntry } from "../types/diagnosesTypes.ts";
import diagnosesService from "../service/diagnosesService.ts";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;
