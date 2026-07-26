import WorkIcon from "@mui/icons-material/Work";
import type { JSX } from "react";

import {
  type DiagnoseEntry,
  type OccupationalHealthcareEntry as OccupationalHealthcareEntryType,
} from "../../../types";
import BaseEntry from "./BaseEntry";

interface Props {
  entry: OccupationalHealthcareEntryType;
  diagnoses: DiagnoseEntry[] | null;
}

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: Props): JSX.Element => {
  return (
    <BaseEntry
      date={entry.date}
      description={entry.description}
      specialist={entry.specialist}
      diagnosisCodes={entry.diagnosisCodes}
      diagnoses={diagnoses}
      icon={<WorkIcon />}
      employerName={entry.employerName}
      additionalInfo={
        entry.sickLeave && (
          <>
            sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </>
        )
      }
    />
  );
};

export default OccupationalHealthcareEntry;
