import { type PatientNewEntryScheme } from "../utils/parseNewPatientEntry.ts";
import type { z } from "zod";

export const PatientGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof PatientGender)[keyof typeof PatientGender];

/*
export interface PatientNewEntry {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
*/

export type PatientNewEntry = z.infer<typeof PatientNewEntryScheme>;
export interface PatientEntry extends PatientNewEntry {
  id: string;
}

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn">;
