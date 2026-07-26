import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import { JSX } from "react";

import { EntryTypes, type Entry } from "../../../types";
import BaseEntry from "./BaseEntry";

type HealthCheckEntryType = Extract<
  Entry,
  { type: typeof EntryTypes.HealthCheck }
>;

const healthCheckColors = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red",
} as const;

const HealthCheckEntry = ({
  entry,
}: {
  entry: HealthCheckEntryType;
}): JSX.Element => {
  return (
    <BaseEntry
      date={entry.date}
      description={entry.description}
      specialist={entry.specialist}
      diagnosisCodes={entry.diagnosisCodes}
      icon={<MedicalServicesIcon />}
      additionalInfo={
        <FavoriteBorderIcon
          sx={{ color: healthCheckColors[entry.healthCheckRating] }}
        />
      }
    />
  );
};

export default HealthCheckEntry;
