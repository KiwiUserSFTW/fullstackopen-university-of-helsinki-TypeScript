import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Male, Female } from "@mui/icons-material";
import {
  PatientGender,
  PatientEntry,
  Gender,
  Entry,
} from "../../types";
import PatientEntries from "./PatientEntries";
import patientService from "../../services/patients";

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

  const addEntryToPatient = (newEntry: Entry) => {
    const updatedPatient: PatientEntry = {
      ...patient,
      entries: [...patient.entries, newEntry],
    };

    setPatient(updatedPatient);
  };

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">
          {patient.name} <GenderIcon gender={patient.gender} />
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography>date of birth: {patient.dateOfBirth}</Typography>
        <PatientEntries patient={patient} addEntryToPatient = {addEntryToPatient}/>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
