import { type PatientNewEntryScheme } from "../utils/parseNewPatientEntry.ts";
import type { z } from "zod";

export const PatientGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof PatientGender)[keyof typeof PatientGender];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

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
  entries: Entry[];
}

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn" | "entries">;
