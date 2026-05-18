import type {
  PatientNonSensetiveEntries,
  PatientEntry,
  PatientNewEntry,
} from "../types/patientsTypes.ts";

import { v1 as uuid } from "uuid";
import data from "../data/patients.ts";

let patients: PatientEntry[] = data;

const getPatients = (): PatientNonSensetiveEntries[] =>
  patients.map(
    ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }): PatientNonSensetiveEntries => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );

const addPatients = (newEntry: PatientNewEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = { ...newEntry, id };

  const updatedPatiens: PatientEntry[] = [...patients, newPatientEntry];

  patients = updatedPatiens;
  return newPatientEntry;
};

export default { getPatients, addPatients };
