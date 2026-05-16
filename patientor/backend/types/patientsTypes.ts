export const PatientGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof PatientGender)[keyof typeof PatientGender];

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientNewEntry = Omit<PatientEntry, "id">;

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn">;
