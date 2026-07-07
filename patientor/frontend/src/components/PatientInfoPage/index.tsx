import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Male, Female } from "@mui/icons-material";
import {
  PatientGender,
  PatientEntry,
  Gender,
  DiagnoseEntry,
} from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const GenderIcon = ({ gender }: { gender: Gender }): JSX.Element => {
  switch (gender) {
    case PatientGender.Female:
      return <Female fontSize="large" />;
    case PatientGender.Male:
      return <Male fontSize="large" />;
    case PatientGender.Other:
      return <></>;
    default:
      return <></>;
  }
};

const PatientEntries = ({
  patient,
}: {
  patient: PatientEntry;
}): JSX.Element => {
  const [diagnoses, setDisgnoses] = useState<DiagnoseEntry[] | null>(null);

  const getDiagnoseCode = (value: string): DiagnoseEntry | undefined => {
    if (!diagnoses) return;
    const diagnoseCode = diagnoses.find((code) => code.code === value);

    return diagnoseCode;
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDisgnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  if (!patient) return <></>;
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">entries</Typography>
      {patient.entries?.length >= 1 ? (
        patient.entries.map((entry) => (
          <Box key={entry.id}>
            <Typography sx={{ fontStyle: "italic" }}>
              {entry.date} - {entry.description}
            </Typography>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => (
                  <li style={{ display: "flex", margin: "5px" }} key={code}>
                    {code} {getDiagnoseCode(code)?.name}
                  </li>
                ))}
            </ul>
          </Box>
        ))
      ) : (
        <Typography>no entries</Typography>
      )}
    </Box>
  );
};
const PatientInfoPage = (): JSX.Element => {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientEntry | null>(null);
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <></>;

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">
          {patient.name} <GenderIcon gender={patient.gender} />
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography>date of birth: {patient.dateOfBirth}</Typography>
        <PatientEntries patient={patient} />
      </Box>
    </div>
  );
};

export default PatientInfoPage;
