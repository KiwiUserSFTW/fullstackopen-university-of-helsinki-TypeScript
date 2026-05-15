import type {
  PatientNonSensetiveEntries,
  PatientEntry,
} from "../types/patientsTypes.ts";
import data from "../data/patients.ts";

const patients: PatientEntry[] = data;

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
export default { getPatients };
