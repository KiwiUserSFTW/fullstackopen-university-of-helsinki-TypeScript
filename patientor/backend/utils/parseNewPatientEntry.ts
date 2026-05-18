import { z } from "zod";

import { type PatientNewEntry, PatientGender } from "../types/patientsTypes.ts";

export const PatientNewEntryScheme = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(PatientGender),
  occupation: z.string(),
});

export const parseNewPatientEntry = (object: unknown): PatientNewEntry =>
  PatientNewEntryScheme.parse(object);
