import type { Response, NextFunction, Request } from "express";
import { z } from "zod";

import { parseNewPatientEntry } from "../utils/parseNewPatientEntry.ts";
import { parseNewEntry } from "../utils/parseNewPatientEntryAdding.ts";

// parser
export const newPatientsParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    parseNewPatientEntry(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newPatientsEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    parseNewEntry(req.body);
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
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
