type PatientGender = "male" | "female" | "other";

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: PatientGender;
  occupation: string;
}

export type PatientNonSensetiveEntries = Omit<PatientEntry, "ssn">;
