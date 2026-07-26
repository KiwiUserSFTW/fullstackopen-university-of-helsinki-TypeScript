import { type PatientNewEntrySchema } from "../utils/parseNewPatientEntry.ts";
import { type NewEntrySchema } from "../utils/parseNewPatientEntryAdding.ts";

import type { z } from "zod";

export const PatientGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof PatientGender)[keyof typeof PatientGender];

export type PatientNewEntry = z.infer<typeof PatientNewEntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Entry = NewEntry & {
  id: string;
};

export interface PatientEntry extends PatientNewEntry {
  id: string;
  entries?: Entry[];
}

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn" | "entries">;
