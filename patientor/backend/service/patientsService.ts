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
    })
  );

const getPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((patient) => patient.id === id);

  return patient;
};

const addPatients = (newEntry: PatientNewEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = { ...newEntry, id, entries: [] };

  const updatedPatiens: PatientEntry[] = [...patients, newPatientEntry];

  patients = updatedPatiens;
  return newPatientEntry;
};

export default { getPatients, addPatients, getPatientById };
