import { EntryTypes, type Entry } from "../../../types";
import { assertNever } from "../../../utils/assertNever";

import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryTypes.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryTypes.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryTypes.HealthCheck:
      return <HealthCheckEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
