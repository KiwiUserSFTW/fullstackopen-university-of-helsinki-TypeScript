import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import type { JSX } from "react";

import {
  type DiagnoseEntry,
  type HospitalEntry as HospitalEntryType,
} from "../../../types";
import BaseEntry from "./BaseEntry";

interface Props {
  entry: HospitalEntryType;
  diagnoses: DiagnoseEntry[] | null;
}

const HospitalEntry = ({ entry, diagnoses }: Props): JSX.Element => {
  return (
    <BaseEntry
      date={entry.date}
      description={entry.description}
      specialist={entry.specialist}
      diagnosisCodes={entry.diagnosisCodes}
      diagnoses={diagnoses}
      icon={<LocalHospitalIcon />}
      additionalInfo={
        <>
          discharge: {entry.discharge.date} - {entry.discharge.criteria}
        </>
      }
    />
  );
};

export default HospitalEntry;
