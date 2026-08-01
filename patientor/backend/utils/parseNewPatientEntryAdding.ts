import { z } from "zod";
import { type NewEntry } from "../types/patientsTypes.ts";

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

const BaseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.iso.date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),

  discharge: z
    .object({
      date: z.iso.date(),
      criteria: z.string().min(1),
    })
    .optional(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),

  employerName: z.string().min(1),

  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),

  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const parseNewEntry = (object: unknown): NewEntry =>
  NewEntrySchema.parse(object);
