import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { JSX } from "react";

import { type HospitalEntry as HospitalEntryType } from "../../../types";
import BaseEntry from "./BaseEntry";

const HospitalEntry = ({
  entry,
}: {
  entry: HospitalEntryType;
}): JSX.Element => {
  return (
    <BaseEntry
      date={entry.date}
      description={entry.description}
      specialist={entry.specialist}
      diagnosisCodes={entry.diagnosisCodes}
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
