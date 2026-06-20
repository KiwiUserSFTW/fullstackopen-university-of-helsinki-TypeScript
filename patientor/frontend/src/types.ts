import { type PatientNewEntryScheme } from "./utils/parseNewPatientEntry.ts";

import type { z } from "zod";

export const PatientGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof PatientGender)[keyof typeof PatientGender];

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientNewEntry = z.infer<typeof PatientNewEntryScheme>;
export interface PatientEntry extends PatientNewEntry {
  id: string;
  entries: Entry[];
}

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn" | "entries">;
export type PatientFormValues = Omit<PatientEntry, "id" | "entries">;
