import {
  EntryTypes,
  type DiagnoseEntry,
  type Entry,
} from "../../../types";
import { assertNever } from "../../../utils/assertNever";

import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry;
  diagnoses: DiagnoseEntry[] | null;
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case EntryTypes.OccupationalHealthcare:
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case EntryTypes.Hospital:
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case EntryTypes.HealthCheck:
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
