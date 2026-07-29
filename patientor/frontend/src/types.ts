import { type PatientNewEntryScheme } from "./utils/parseNewPatientEntry.ts";
import type {
  NewEntrySchema,
  HospitalEntrySchema,
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
} from "./utils/parseNewPatientEntryAdding.ts";

import type { z } from "zod";

export const PatientGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export const EntryTypes = {
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
  HealthCheck: "HealthCheck",
} as const;

export type UnionEntryTypes = (typeof EntryTypes)[keyof typeof EntryTypes];

export type Gender = (typeof PatientGender)[keyof typeof PatientGender];

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;

export type Entry = NewEntry & {
  id: string;
};

export type PatientNewEntry = z.infer<typeof PatientNewEntryScheme>;
export interface PatientEntry extends PatientNewEntry {
  id: string;
  entries: Entry[];
}

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn" | "entries">;
export type PatientFormValues = Omit<PatientEntry, "id" | "entries">;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
