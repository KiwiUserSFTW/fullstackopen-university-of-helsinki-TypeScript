import { SyntheticEvent, useState, ChangeEvent } from "react";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  Stack,
  Chip,
} from "@mui/material";

import { DiagnoseEntry } from "../../../types";
import { type HealthCheckRating } from "../../../utils/parseNewPatientEntryAdding";
import { UnionEntryTypes, NewEntry, EntryTypes } from "../../../types";
import { assertNever } from "../../../utils/assertNever";

import { HEALTHBAR_TEXTS } from "../../../constants";
interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: DiagnoseEntry[] | null;
}

type FormState = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];

  // TODO double check structure of different entry types
  dischargeDate: string;
  dischargeCriteria: string;

  sickLeaveStartDate: string;
  sickLeaveEndDate: string;

  employerName: string;

  healthCheckRating: string;
};

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [form, setForm] = useState<FormState>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],

    // Hospital values
    dischargeDate: "",
    dischargeCriteria: "",

    // Occupational healthcare values
    employerName: "",
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",

    // Health check values
    healthCheckRating: "",
  });

  const [entryType, setEntryType] = useState<UnionEntryTypes>(
    EntryTypes.Hospital,
  );

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description: form.description,
      date: form.date,
      specialist: form.specialist,
      diagnosisCodes: form.diagnosisCodes,
      type: entryType,
    };

    switch (entryType) {
      case EntryTypes.Hospital:
        onSubmit({
          ...baseEntry,
          type: EntryTypes.Hospital,
          ...(form.dischargeDate || form.dischargeCriteria
            ? {
                discharge: {
                  date: form.dischargeDate,
                  criteria: form.dischargeCriteria,
                },
              }
            : {}),
        });
        return;

      case EntryTypes.OccupationalHealthcare:
        onSubmit({
          ...baseEntry,
          type: EntryTypes.OccupationalHealthcare,
          employerName: form.employerName,
          ...(form.sickLeaveStartDate || form.sickLeaveEndDate
            ? {
                sickLeave: {
                  startDate: form.sickLeaveStartDate,
                  endDate: form.sickLeaveEndDate,
                },
              }
            : {}),
        });
        return;

      case EntryTypes.HealthCheck:
        onSubmit({
          ...baseEntry,
          type: EntryTypes.HealthCheck,
          healthCheckRating: Number(
            form.healthCheckRating,
          ) as (typeof HealthCheckRating)[keyof typeof HealthCheckRating],
        });
        return;

      default:
        assertNever(entryType);
    }
  };

  const handleChange =
    (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            label="Entry Type"
            onChange={(event) =>
              setEntryType(event.target.value as UnionEntryTypes)
            }
          >
            <MenuItem value={EntryTypes.Hospital}>Hospital</MenuItem>
            <MenuItem value={EntryTypes.OccupationalHealthcare}>
              Occupational Healthcare
            </MenuItem>
            <MenuItem value={EntryTypes.HealthCheck}>Health Check</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={form.description}
          onChange={handleChange("description")}
        />
        <TextField
          type="date"
          label="Date"
          value={form.date}
          onChange={handleChange("date")}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={form.specialist}
          onChange={handleChange("specialist")}
        />
        {diagnoses && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              multiple
              value={form.diagnosisCodes}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  diagnosisCodes: [...event.target.value],
                }))
              }
              input={<OutlinedInput label="Diagnosis codes" />}
              renderValue={(selected) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {(selected as string[]).map((code) => (
                    <Chip key={code} label={code} size="medium" />
                  ))}
                </Stack>
              )}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {entryType === EntryTypes.Hospital && (
          <>
            <TextField
              type="date"
              label="Discharge"
              value={form.dischargeDate}
              onChange={handleChange("dischargeDate")}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              label="Discharge criteria"
              fullWidth
              margin="normal"
              value={form.dischargeCriteria}
              onChange={handleChange("dischargeCriteria")}
            />
          </>
        )}
        {entryType === EntryTypes.OccupationalHealthcare && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              margin="normal"
              value={form.employerName}
              onChange={handleChange("employerName")}
            />
            <TextField
              label="Sick leave start date"
              type="date"
              fullWidth
              value={form.sickLeaveStartDate}
              onChange={handleChange("sickLeaveStartDate")}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              value={form.sickLeaveEndDate}
              onChange={handleChange("sickLeaveEndDate")}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </>
        )}
        {entryType === EntryTypes.HealthCheck && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="health-check-rating-label">
              Health check rating
            </InputLabel>

            <Select
              labelId="health-check-rating-label"
              value={form.healthCheckRating}
              label="Health check rating"
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  healthCheckRating: event.target.value,
                }))
              }
            >
              {HEALTHBAR_TEXTS.map((rate, index) => (
                <MenuItem key={index} value={index}>
                  {index} - {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
