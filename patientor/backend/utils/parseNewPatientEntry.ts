import {
  type Gender,
  type PatientNewEntry,
  PatientGender,
} from "../types/patientsTypes.ts";

export const parseNewPatientEntry = (object: unknown): PatientNewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const { name, dateOfBirth, ssn, gender, occupation } = object;
    return {
      name: parseName(name),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
    };
  }

  throw new Error("Incorrect data: some fields are missing");
};

// parser helpers
const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return (Object.values(PatientGender) as string[]).includes(gender);
};

const createParseErrorValue = (key: string, value?: unknown): string =>
  `Incorrect or missing ${key} ${value ? `: ${JSON.stringify(value)}` : ""}`;

// parsers
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(createParseErrorValue("name", name));
  }

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(createParseErrorValue("dateOfBirth", date));
  }

  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(createParseErrorValue("occupation", occupation));
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(createParseErrorValue("gender", gender));
  }

  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(createParseErrorValue("ssn", ssn));
  }

  return ssn;
};
