import { SyntheticEvent, useState, ChangeEvent } from "react";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { type HealthCheckRating } from "../../../utils/parseNewPatientEntryAdding";
import { UnionEntryTypes, NewEntry, EntryTypes } from "../../../types";
import { assertNever } from "../../../utils/assertNever";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

type FormState = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;

  dischargeDate: string;
  dischargeCriteria: string;

  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;

  healthCheckRating: string;
};

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [form, setForm] = useState<FormState>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: "",

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
    const diagnosisFormat = (codes: string): string[] => codes.split(",");

    const diagnosisCodes = form.diagnosisCodes
      ? diagnosisFormat(form.diagnosisCodes)
      : [];

    const baseEntry = {
      description: form.description,
      date: form.date,
      specialist: form.specialist,
      diagnosisCodes,
      type: entryType,
    };

    switch (entryType) {
      case EntryTypes.Hospital:
        onSubmit({
          ...baseEntry,
          type: EntryTypes.Hospital,
          discharge: {
            date: form.dischargeDate,
            criteria: form.dischargeCriteria,
          },
        });
        return;

      case EntryTypes.OccupationalHealthcare:
        onSubmit({
          ...baseEntry,
          type: EntryTypes.OccupationalHealthcare,
          employerName: form.employerName,
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
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          margin="normal"
          value={form.date}
          onChange={handleChange("date")}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={form.specialist}
          onChange={handleChange("specialist")}
        />
        <TextField
          label="Diagnosis codes"
          placeholder="A01,B02,C03"
          fullWidth
          margin="normal"
          value={form.diagnosisCodes}
          onChange={handleChange("diagnosisCodes")}
        />
        {entryType === EntryTypes.Hospital && (
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              margin="normal"
              value={form.dischargeDate}
              onChange={handleChange("dischargeDate")}
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
              label="Sick leave start"
              placeholder="YYYY-MM-DD"
              fullWidth
              margin="normal"
              value={form.sickLeaveStartDate}
              onChange={handleChange("sickLeaveStartDate")}
            />
            <TextField
              label="Sick leave end"
              placeholder="YYYY-MM-DD"
              fullWidth
              margin="normal"
              value={form.sickLeaveEndDate}
              onChange={handleChange("sickLeaveEndDate")}
            />
          </>
        )}
        {entryType === EntryTypes.HealthCheck && (
          <TextField
            label="Health check rating"
            type="number"
            fullWidth
            margin="normal"
            value={form.healthCheckRating}
            onChange={({ target }) => {
              const value = Number(target.value);
              if (![0, 1, 2, 3].includes(value)) {
                return;
              }
              setForm((prev) => ({
                ...prev,
                healthCheckRating: target.value,
              }));
            }}
          />
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
