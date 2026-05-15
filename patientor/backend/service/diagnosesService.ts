import { type DiagnoseEntry } from "../types/diagnosesTypes.ts";
import data from "../data/diagnoses.ts";

const diagnoses: DiagnoseEntry[] = data;

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default { getDiagnoses };
