import type { Response, NextFunction, Request } from "express";
import { z } from "zod";
import { PatientNewEntryScheme } from "../utils/parseNewPatientEntry.ts";

// parser
export const newPatientsParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    PatientNewEntryScheme.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// error handler
export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
