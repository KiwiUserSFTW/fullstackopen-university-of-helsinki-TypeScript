import WorkIcon from "@mui/icons-material/Work";

import { JSX } from "react";

import { type OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../../../types";
import BaseEntry from "./BaseEntry";

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntryType;
}): JSX.Element => {
  return (
    <BaseEntry
      date={entry.date}
      description={entry.description}
      specialist={entry.specialist}
      diagnosisCodes={entry.diagnosisCodes}
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
