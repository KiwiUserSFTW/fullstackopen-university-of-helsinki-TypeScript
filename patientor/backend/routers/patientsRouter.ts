import express, { type Response, type Request } from "express";

import type {
  PatientEntry,
  PatientNewEntry,
  PatientNonSensetiveEntries,
} from "../types/patientsTypes.ts";

import {
  errorMiddleware,
  newPatientsParser,
} from "../middleware/patientsMiddlewares.ts";
import patientsService from "../service/patientsService.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensetiveEntries[]>) => {
  res.json(patientsService.getPatients());
});

patientsRouter.post(
  "/",
  newPatientsParser,
  (
    req: Request<unknown, unknown, PatientNewEntry>,
    res: Response<PatientEntry>,
  ) => {
    res.json(patientsService.addPatients(req.body));
  },
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
