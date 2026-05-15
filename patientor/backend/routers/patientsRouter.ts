import express, { type Response } from "express";
import type { PatientNonSensetiveEntries } from "../types/patientsTypes.ts";
import patientsService from "../service/patientsService.ts";
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensetiveEntries[]>) => {
  res.send(patientsService.getPatients());
});

export default patientsRouter;
