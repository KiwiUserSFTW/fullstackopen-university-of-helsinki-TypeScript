import type {
  PatientNonSensetiveEntries,
  PatientEntry,
  PatientNewEntry,
  NewEntry,
  Entry,
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

const addEntryToPatient = (
  newEntry: NewEntry,
  id: string
): Entry | undefined => {
  const patientEntry = getPatientById(id);
  if (!patientEntry) {
    return undefined;
  }

  const entry: Entry = {
    ...newEntry,
    id: uuid(),
  };

  const updatedPatient: PatientEntry = {
    ...patientEntry,
    entries: [...(patientEntry.entries ?? []), entry],
  };

  patients = patients.map((patient) =>
    patient.id === id ? updatedPatient : patient
  );
  return entry;
};

export default { getPatients, addPatients, getPatientById, addEntryToPatient };
