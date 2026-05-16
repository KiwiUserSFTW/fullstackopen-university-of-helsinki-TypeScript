import express, { type Response } from "express";
import type {
  PatientEntry,
  PatientNonSensetiveEntries,
} from "../types/patientsTypes.ts";
import patientsService from "../service/patientsService.ts";
import { parseNewPatientEntry } from "../utils/parseNewPatientEntry.ts";
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensetiveEntries[]>) => {
  res.json(patientsService.getPatients());
});

patientsRouter.post("/", (req, res: Response<PatientEntry | string>) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatients(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
