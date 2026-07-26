import express, { type Response, type Request } from "express";

import type {
  NewEntry,
  PatientEntry,
  PatientNewEntry,
  PatientNonSensetiveEntries,
} from "../types/patientsTypes.ts";

import {
  errorMiddleware,
  newPatientsEntryParser,
  newPatientsParser,
} from "../middleware/patientsMiddlewares.ts";
import patientsService from "../service/patientsService.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensetiveEntries[]>) => {
  res.json(patientsService.getPatients());
});

patientsRouter.get("/:id", (req, res: Response<PatientEntry>) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

patientsRouter.post(
  "/",
  newPatientsParser,
  (
    req: Request<unknown, unknown, PatientNewEntry>,
    res: Response<PatientEntry>
  ) => {
    res.json(patientsService.addPatients(req.body));
  }
);

patientsRouter.post(
  "/:id/entries",
  newPatientsEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<NewEntry>
  ) => {
    res.json(patientsService.addEntryToPatient(req.body, req.params.id));
  }
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
